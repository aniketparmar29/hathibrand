const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const cors = require('cors');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('request');

dotenv.config({path:"./config.env"})

// app.use(cors({
  //   origin: ['http://localhost:3000',''],
  //   credentials: true,
  // }));
  

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const pool = mysql.createPool({
connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://hathibrand.in');
//   next();
// });






pool.getConnection(function(err, connection) {
    if (err) throw err;
  
    // Use the connection
    connection.query('SELECT * FROM products', function (error, results, fields) {
      // Release the connection back to the pool
      connection.release();
  
      if (error) throw error;
  
      // Do something with the results
      console.log("connection to mysql");
    });
  });



  app.post('/create_order', (req, res) => {
    const data = {
      key: process.env.API_KEY,
      client_txn_id: req.body.client_txn_id,
      amount: req.body.amount,
      p_info: "products",
      redirect_url: "https://hathibrand.in/checkoutsuccess",
      customer_name: req.body.customer_name,
      customer_email: req.body.customer_email,
      customer_mobile: req.body.customer_mobile,
      udf1: "user defined field 1 (max 25 char)",
      udf2: "user defined field 2 (max 25 char)",
      udf3: "user defined field 3 (max 25 char)"
    };
  
    request.post({
      url: "https://merchant.upigateway.com/api/create_order",
      json: data
    }, (error, response, body) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          msg: "Internal Server Error"
        });
      }
  
      if (!body.status) {
        console.error(body.msg);
        return res.status(400).json({
          status: false,
          msg: body.msg
        });
      }
  
      const orderId = body.data.order_id;
      const paymentUrl = body.data.payment_url;
      let addressop = req.body.addressop;
      let amount = req.body.amount;
      let product = req.body.products;
      let user_id = req.body.user_id;
      let trx_id = req.body.client_txn_id;
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      let trx_date = formattedDate;
      let tracking_id = 0;
      let payment = false;
      let status = "pending";
  
      pool.query(
        'INSERT INTO `orders` (`addressop`, `amount`, `product`, `user_id`, `tracking_id`,`trx_id`,`trx_date`,`payment`,`status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [addressop, amount, product, user_id, tracking_id, trx_id, trx_date, payment, status], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            status: false,
            msg: "Internal Server Error"
          });
        }
  
        console.log("Order details saved to MySQL database");
  
        res.json({
          status: true,
          msg: "Payment Order Created",
          data: {
            order_id: orderId,
            payment_url: paymentUrl
          }
        });
      });
    });
  });
  

  
  app.post('/check_order', (req, res) => {
    const data = {
      key: process.env.API_KEY,
      client_txn_id: req.body.client_txn_id,
      txn_date: req.body.txn_date
    };
    console.log(data);
    request.post({
      url: "https://merchant.upigateway.com/api/check_order_status",
      json: data
    }, (error, response, body) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          msg: "Internal Server Error"
        });
      }
  
      if (!body.status) {
        console.error(body.msg);
        return res.status(400).json({
          status: false,
          msg: body.msg
        });
      }
  
      console.log(body);
      // Success response
      return res.status(200).json(body);
    });
  });
  

  app.put('/orders/payment/:trx_id', (req, res) => {
    const trx_id = req.params.trx_id;
    const payment = req.body.payment;
  
    // execute the SQL query to update the payment status of the order
    pool.query('UPDATE `orders` SET `payment` = ? WHERE `trx_id` = ?', [payment, trx_id], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating payment status');
      } else {
        res.status(200).send('Payment status updated successfully');
      }
    });
  });


  app.get('/orders/:id', function(req, res) {
    var user_id = req.params.id;
    pool.query('SELECT * FROM orders WHERE user_id = ?', [user_id], function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  });
  
  app.get('/orders', function(req, res) {
    pool.query('SELECT * FROM orders', function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    });
  });
  

  //create product
  app.post('/products/new', (req, res) => {
  
    const { name, price, stock, image, weight, Category } = req.body;
    if (!name || !price || !stock || !image || !weight || !Category) { // check if any required field is missing
      res.status(400).send('Missing required fields');
      return;
    }
  
    pool.query(
      'INSERT INTO `products` (`name`, `price`, `image`, `stock`, `weight`, `Category`) VALUES (?, ?, ?, ?, ?, ?)',
      [name, price, image, stock, weight, Category],
      (err, result) => {
        if (err) {
          console.error('Error creating product:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Product created:', result);
        res.sendStatus(201);
      }
    );
  });
  

//single product

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('SELECT `id`, `name`, `price`, `image`, `date`, `stock`, `weight`, `Category` FROM `products` WHERE `id` = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error retrieving product:', err);
      res.sendStatus(500);
      return;
    }
    if (results.length === 0) {
      res.sendStatus(404); // return a 404 status code if the product is not found
      return;
    }
    res.json(results[0]); 
  });
});



  ///update product
  app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body)

    const { name, price, stock,weight } = req.body;
    let updateFields = '';
    const updateParams = [];
    
    if (name) {
      updateFields += 'name = ?, ';
      updateParams.push(name);
    }
    if (price) {
      updateFields += 'price = ?, ';
      updateParams.push(price);
    }

    if (stock) {
      updateFields += 'stock = ?, ';
      updateParams.push(stock);
    }
    if (weight) {
      updateFields += 'weight = ?, ';
      updateParams.push(weight);
    }
  
    // remove trailing comma
    updateFields = updateFields.slice(0, -2);
  
    // add id to the update params
    updateParams.push(id);
  
    const query = `UPDATE products SET ${updateFields} WHERE id = ?`;
  
    pool.query(query, updateParams, (err, result) => {
      if (err) {
        console.error('Error updating product:', err);
        res.sendStatus(500);
        return;
      }
      console.log('Product updated:', result);
      res.sendStatus(200);
    });
  });
  

  //get all products
  app.get('/products', (req, res) => {
    const { sort } = req.query;
  
    let order = '';
    if (sort === 'desc') {
      order = 'ORDER BY price DESC';
    } else if (sort === 'asc') {
      order = 'ORDER BY price ASC';
    } else if (sort === 'atoz') {
      order = 'ORDER BY name ASC';
    } else if (sort === 'ztoa') {
      order = 'ORDER BY name DESC';
    }
  
    pool.query(`SELECT * FROM products ${order}`, (err, results) => {
      if (err) {
        console.error('Error retrieving products:', err);
        res.sendStatus(500);
        return;
      }
      res.json(results);
    });
  });
  
//serach product
app.get('/search', (req, res) => {
  const { query } = req.query;
  pool.query(`SELECT * FROM products WHERE name LIKE '%${query}%'`, (err, results) => {
    if (err) {
      console.error('Error searching for products:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
  
  
});


// delete prodocut

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  pool.query('DELETE FROM `products` WHERE `id` = ?', [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.sendStatus(500,"there is some error");
      return;
    }
    res.sendStatus(200,"product deleted");
  });
});

// Register route
app.post('/register', (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  // Check if email already exists in the database
  const checkEmailSql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  const checkEmailValues = [email];

  pool.query(checkEmailSql, checkEmailValues, (error, results) => {
    if (error) {
      console.error('Error checking email in database:', error);
      res.sendStatus(500);
      return;
    }

    const emailExists = results[0].count > 0;

    if (emailExists) {
      res.status(400).send('Email already registered');
      return;
    }

    // Hash password using bcrypt
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.sendStatus(500);
        return;
      }

      const role = 'user';
      // Insert new user into MySQL database
      const insertUserSql = 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)';
      const insertUserValues = [email, hash, name, role];

      pool.query(insertUserSql, insertUserValues, (error, results) => {
        if (error) {
          console.error('Error inserting user into database:', error);
          res.sendStatus(500);
          return;
        }

        // Generate token for user
        const token = generateToken(results.insertId);

        // Set token as cookie in response
        res.cookie('token', token);

        // Send success response
        res.send('User registered successfully');
      });
    });
  });
});



// Login route
app.post('/login', (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  // Retrieve user from MySQL database by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  const values = [email];
  pool.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error retrieving user from database:', error);
      res.sendStatus(500);
      return;
    }

    if (results.length === 0) {
      res.sendStatus(401);
      return;
    }

    // Compare password with hashed password using bcrypt
    const user = results[0];
    console.log(password,user.password)

    try {
  bcrypt.compare(password, user.password, (err, passwordMatch) => {
    if (err || !passwordMatch) {
      console.error('Error comparing password:', err);
      res.sendStatus(401);
      return;
    }

      // Generate token for user
      const token = generateToken(user.id);

      // Set token as cookie in response
      res.cookie('token', token);

      // Send success response with user data and token
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token
      });
    });
} catch (err) {
  console.error('Error during bcrypt.compare:', err);
  res.sendStatus(500);
}
  });
});

//delete user 
app.delete('/user/:id', (req, res) => {
  const userid = req.params.id;

  pool.query('DELETE FROM `users` WHERE `id` = ?', [userid], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.sendStatus(500,"there is some error");
      return;
    }
    res.sendStatus(200,"product deleted");
  });
});

//single user
app.get('/user/:id', (req, res) => {
  const userid = req.params.id;
  pool.query('SELECT `id`, `name`, `email`, `password`, `role` FROM `users` WHERE `id` = ?', [userid], (err, results) => {
    if (err) {
      console.error('Error retrieving product:', err);
      res.sendStatus(500);
      return;
    }
    if (results.length === 0) {
      res.sendStatus(404); // return a 404 status code if the product is not found
      return;
    }
    res.json(results[0]); // return the first product in the array
  });
});


//get all users

app.get('/users', (req, res) => {
  const { sort } = req.query;

  let order = '';
  if(sort === 'atoz') {
    order = 'ORDER BY name ASC';
  } else if (sort === 'ztoa') {
    order = 'ORDER BY name DESC';
  }

  pool.query(`SELECT * FROM users ${order}`, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});



//cart 
app.post('/add-to-cart', (req, res) => {
  console.log(req.body)
  const { pr_name, pr_price, pr_que, pr_id, pr_img,pr_category,pr_weight, user_id } = req.body;

  // check if a row already exists for the given pr_id and user_id combination
  pool.query(
    'SELECT * FROM cart WHERE pr_id = ? AND user_id = ?',
    [pr_id, user_id],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error checking if item exists in cart');
      } else if (results.length > 0) {
        // update the existing row with the new quantity
        pool.query(
          'UPDATE cart SET pr_que = pr_que + ? WHERE pr_id = ? AND user_id = ?',
          [pr_que, pr_id, user_id],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              res.status(500).send('Error updating item in cart');
            } else {
              res.status(200).send('Item updated in cart');
            }
          }
        );
      } else {
        // insert a new row for the product in the cart table
        pool.query(
          'INSERT INTO cart (pr_name, pr_price, pr_que, pr_id, pr_img,pr_category,pr_weight, user_id) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
          [pr_name, pr_price, pr_que, pr_id, pr_img,pr_category,pr_weight, user_id],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              res.status(500).send('Error adding item to cart');
            } else {
              res.status(200).send('Item added to cart');
            }
          }
        );
      }
    }
  );
});




// get cart
app.get('/cart/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query('SELECT * FROM cart WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving cart details');
      return;
    }

    res.send(results);
  });
});


// delete cart
app.delete('/cart/:userId/:prId', (req, res) => {
  const userId = req.params.userId;
  const prId = req.params.prId;

  pool.query('DELETE FROM cart WHERE user_id = ? AND pr_id = ?', [userId, prId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting item from cart');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Item not found in cart');
      return;
    }

    res.send(`Item with pr_id ${prId} deleted from cart for user with user_id ${userId}`);
  });
});


app.delete('/cart/:userId', (req, res) => {
  const userId = req.params.userId;

  pool.query('DELETE FROM cart WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting items from cart');
      return;
    }

    res.send(`Cart cleared for user with user_id ${userId}`);
  });
});



//update_cart

app.put('/cart/:userId/:prId', (req, res) => {
  const userId = req.params.userId;
  const prId = req.params.prId;
  const prQue = req.body.pr_que;

  pool.query('UPDATE cart SET pr_que = ? WHERE user_id = ? AND pr_id = ?', [prQue, userId, prId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating item in cart');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Item not found in cart');
      return;
    }

    res.send(`Item with pr_id ${prId} updated in cart for user with user_id ${userId}`);
  });
});

//reviews


app.post('/reviews/new', (req, res) => {
  const { user_name, rating, review, pr_id, pr_name, user_id } = req.body;

  // insert the item into the cart table
  pool.query(
    'INSERT INTO reviews (user_name, rating, review, pr_id, pr_name, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    [user_name,rating,review, pr_id, pr_name, user_id],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error adding review to reviews');
      } else {
        res.status(200).send('Item added to reviews');
      }
    }
  );
});

// get all reviews
app.get('/reviews', (req, res) => {


  pool.query(`SELECT * FROM reviews `, (err, results) => {
    if (err) {
      console.error('Error retrieving reviews:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});



// get reviews

app.get('/reviews/:pr_id', (req, res) => {
  const pr_id = req.params.pr_id;

  pool.query('SELECT * FROM reviews WHERE pr_id = ?', [pr_id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving reviews details');
      return;
    }

    console.log(results)
    res.send(results);
  });
});


// delete reviews
app.delete('/reviews/:userId/:prId', (req, res) => {
  const userId = req.params.userId;
  const prId = req.params.prId;

  pool.query('DELETE FROM reviews WHERE user_id = ? AND pr_id = ?', [userId, prId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting item from cart');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Item not found in cart');
      return;
    }

    res.send(`Item with pr_id ${prId} deleted from cart for user with user_id ${userId}`);
  });
});

//review update

app.put('/reviews/:userId/:prId', (req, res) => {
  const userId = req.params.userId;
  const prId = req.params.prId;
  const rating = req.body.rating;
  const review = req.body.review;

  pool.query('UPDATE reviews SET rating = ?, review = ? WHERE user_id = ? AND pr_id = ?', [rating, review, userId, prId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating item in reviews');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send('Item not found in reviews');
      return;
    }

    res.send(`Item with pr_id ${prId} updated in reviews for user with user_id ${userId}`);
  });
});



//create coupons
app.post('/coupons', (req, res) => {
  const coupon = {
    cuponcode: req.body.cuponcode,
    value: req.body.value,
    price: req.body.price
  };

  // Insert the coupon into the database
  pool.query('INSERT INTO cupon SET ?', coupon, (error, results, fields) => {
    if (error) throw error;
    res.send('Coupon created successfully.');
  });
});

// Get all coupon codes
app.get('/coupons', (req, res) => {
  pool.query('SELECT * FROM cupon', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

// Get a specific coupon code by ID
app.get('/coupons/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM cupon WHERE id = ?', id, (error, results, fields) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

// Update a coupon code
app.put('/coupons/:id', (req, res) => {
  const id = req.params.id;
  const coupon = {
    cuponcode: req.body.cuponcode,
    value: req.body.value,
    price: req.body.price
  };

  // Update the coupon in the database
  pool.query('UPDATE cupon SET ? WHERE id = ?', [coupon, id], (error, results, fields) => {
    if (error) throw error;
    res.send('Coupon updated successfully.');
  });
});

// Delete a coupon code
app.delete('/coupons/:id', (req, res) => {
  const id = req.params.id;

  // Delete the coupon from the database
  pool.query('DELETE FROM cupon WHERE id = ?', id, (error, results, fields) => {
    if (error) throw error;
    res.send('Coupon deleted successfully.');
  });
});

//get slider
app.get('/slider', (req, res) => {

  // Query to get slider data from database 
  let sql = `SELECT * FROM slider ORDER BY id DESC`;

  pool.query(sql, (err, results) => {

      if(err) throw err;

      res.json(results);

  }); 
}); 

 // Create new slider data  
 app.post('/slider', (req, res) => {

  let sqlQuery = `INSERT INTO slider SET ?`;

  let data = {url: req.body.url};

  pool.query(sqlQuery, data, (err, result) => {

      if(err) throw err;

      res.send({message: 'Slider created successfully!'});

  });  
});

// Delete existing slider data  
app.delete('/slider/:id', (req, res) => {

  let sqlQuery = `DELETE FROM slider WHERE id=${req.params.id}`;

  pool.query(sqlQuery, (err, result) => {

      if(err) throw err;

      res.send({message: 'Slider deleted successfully!'});    												                                                                                                                            });  
}); 






// Generate token function
function generateToken(userId) {
  const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
  return token;
}


const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled exception:', err);
  // gracefully shutdown the server
  server.close(() => {
    process.exit(1);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  // gracefully shutdown the server
  server.close(() => {
    process.exit(1);
  });
});