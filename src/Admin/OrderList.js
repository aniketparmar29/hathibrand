import { Document, Page, Text,pdf,View,Image} from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../Redux/AdminReducer/actions";
import imgop from '../assets/logo.png'
const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.AdminReducer.orders);
  const [filterBy, setFilterBy] = useState("");
  const [uniqueDates, setUniqueDates] = useState([]);

  useEffect(() => {  
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    // Get unique transaction dates from orders
    const dates = new Set(orders.map(order => order.trx_date));
    setUniqueDates([...dates]);
  }, [orders]);

  const filteredOrders = orders.filter(order => order.trx_date.includes(filterBy));

  
  

  const downloadorder = async (order) => {
    console.log(order);
  
    // Parse the JSON strings into objects
    const billingAddress = JSON.parse(order.addressop);
    const products = JSON.parse(order.product);

    
    // Create a new PDF document
    const pdfDoc = (
      <Document>
  <Page >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

    <View style={{ width: '45%', fontFamily: 'Helvetica', fontSize: 18, fontWeight: 'bold',marginLeft:"25px",display:'flex',flexDirection:'column','gap':'20px',borderRight:'1px solid grey' }}>
      <View>
        <Text>To:</Text>
        <Text>Name:{billingAddress.name}</Text>
        <Text>Address:{billingAddress.Address}</Text>
        <Text>Village:{billingAddress.village}</Text>
        <Text>Taluka:{billingAddress.taluka} </Text>
        <Text>Disctict:{billingAddress.district} </Text>
        <Text>State:{billingAddress.state}</Text>
        <Text>Pincode:{billingAddress.pincode}</Text>
        <Text>Mobile:{billingAddress.phone}</Text>
      </View>
    </View>
    <View style={{ width: '45%', fontFamily: 'Helvetica', fontSize: 12, fontWeight: 'extrabold',marginRight:'25px' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 24 }}>
        <Text style={{ width: '60%', fontWeight: 'bold', paddingLeft: 5 }}>Product</Text>
        <Text style={{ width: '40%', fontWeight: 'bold', textAlign: 'center', paddingRight: 5 }}>Que</Text>
        <Text style={{ width: '40%', fontWeight: 'bold', textAlign: 'right', paddingRight: 5 }}>Weight</Text>
      </View>
      {products.map((item) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 24 }} key={item.cart_id}>
          <Text style={{ width: '60%', paddingLeft: 5 }}>{item.pr_name}</Text>
          <Text style={{ width: '40%', textAlign: 'center', paddingRight: 5 }}>{item.pr_que}</Text>
          <Text style={{ width: '40%', textAlign: 'right', paddingRight: 5 }}>{item.pr_weight}</Text>
        </View>
      ))}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ width: '60%', fontWeight: 'bold', textAlign: 'right', paddingRight: 5 }}>Total:</Text>
        <Text style={{ width: '40%', textAlign: 'right' }}>₹{order.amount}</Text>
      </View>
    </View>
    </View>
    <View style={{display:'flex',marginLeft:'25px',marginTop:'10px',borderTop:'1px solid grey'}}>
      <View style={{display:'flex',justifyContent:'space-between'}}>
      <View>
        <Text>FROM:</Text>
        <Text>HATHIBRAND AGARBATTI</Text>
        <Text>LATHIDAD,</Text>
        <Text>BOTAD:364710</Text>
        <Text>BOTAD (GUJARAT)</Text>
        <Text>MO-9638857089</Text>
      </View>
      <View>
      </View>
      <Image style={{width:'200px',marginTop:'10px',position:'absolute',right:"10px"}} src={imgop}/>
      </View>
    </View>
  </Page>
</Document>

    
    );
  
    // Generate a blob from the PDF document
    const blob = await pdf(pdfDoc).toBlob();
  
    // Create a URL from the blob
    const url = URL.createObjectURL(blob);
  
    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `order_${order.order_id}.pdf`;
    link.click();
  
    // Clean up the URL and link
    URL.revokeObjectURL(url);
    link.remove();
  };
  


  return (
    <div className=" lg:flex-row items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <select
          id="filterByDate"
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
          }}
          className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a date</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-4">
        {filteredOrders && filteredOrders.map((order) => (
          <div key={order.order_id} className="border border-gray-300 rounded-lg p-4">
            <p className="text-lg font-medium mb-2">Order ID: {order.order_id}</p>
            <p className="text-gray-600 mb-2">Transaction ID: {order.trx_id}</p>
            <p className="text-gray-600 mb-2">Amount: {order.amount}</p>
            <p className="text-gray-600 mb-2">Status: {order.status}</p>
            <p className="text-gray-600 mb-2">Transaction Date: {order.trx_date}</p>
            <p >Payment: {order.payment === '1' ? <span className='text-green-500'>success</span> : <span className='text-red-500'>failed</span>}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
              onClick={() => downloadorder(order)}
            >
              Download order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
