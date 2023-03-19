import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {createProduct } from "../Redux/AdminReducer/actions";
import { useAlert } from "react-alert";
import { Button } from "@chakra-ui/react";
import MetaData from "./MetaData";
import { FaTree } from 'react-icons/fa';
import { GiFleshyMass } from 'react-icons/gi';
import { AiOutlineDatabase } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { BiMoney } from 'react-icons/bi';
import SideBar from "./components/Sidebar";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const isLoading = useSelector((state) => state.AdminReducer.isLoading);
  const isError = useSelector((state) => state.AdminReducer.isError);
  const success = useSelector((state) => state.AdminReducer.success);
  const [btnop, setbtnop] = useState(false)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [image, setImage] = useState("");
  const categories = [
    "Agarbatti",
    "Cosmetic",
  ];
console.log(isLoading,success,isError)
  useEffect(() => {
    if (success) {
      alert.success("Product Created Successfully");
    }
    if(isError){
      alert.error("Some Error is there");
    }
  }, [dispatch, alert, isError, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const product={
      name,
      price,
      category,
      image,
      stock,
      weight
    }
      
    console.log(product)
    dispatch(createProduct(product));
  };



  async function handelimage(e){
    let api_key= "8b1f01edede5586a463d22be7a935729";
    setbtnop(true);
    try{
      const files = Array.from(e.target.files);
      console.log(files);
      let form = new FormData();
      files.forEach(file => form.append('image', file));
      
      let res = await fetch(`https://api.imgbb.com/1/upload?key=${api_key}`,{
        method:'POST',
        body: form,
      });
      let data = await res.json();
      setImage(data.data.display_url);
      setbtnop(false);
    } catch(e){
      console.log(e);
    }
  }
  
  

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm "
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <FiCheckCircle />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <BiMoney />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <FaTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <GiFleshyMass />
              <input
                type="number"
                placeholder="Weight"
                required
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>         

            <div>
              <AiOutlineDatabase />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handelimage}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              isDisabled={btnop?true:false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
