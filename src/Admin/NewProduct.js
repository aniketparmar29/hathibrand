import React, { Fragment, useEffect, useState } from "react";
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

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const isError = useSelector((state) => state.AdminReducer.isError);
  const success = useSelector((state) => state.AdminReducer.success);
  const [btnop, setbtnop] = useState(false)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [Category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [weight, setWeight] = useState(0);
  const [image, setImage] = useState("");
  const categories = [
    "Agarbatti",
    "Cosmetic",
  ];
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
      Category,
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
    <div>
      <div className="col-span-3 p-4 rounded-md lg:w-[30%] md:w-[50%] bg-white shadow-lg my-10 mx-auto shadow-blue-600">
        <form
          className="space-y-4 flex-col justify-center items-center"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1 className="text-2xl font-bold text-gray-800">Create Product</h1>
  
          <div className="flex items-center space-x-2">
            <FiCheckCircle className="text-blue-500" />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div className="flex items-center space-x-2">
            <BiMoney className="text-blue-500" />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div className="flex items-center space-x-2">
            <FaTree className="text-blue-500" />
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
  
          <div className="flex items-center space-x-2">
            <GiFleshyMass className="text-blue-500" />
            <input
              type="number"
              placeholder="Weight"
              required
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div className="flex items-center space-x-2">
            <AiOutlineDatabase className="text-blue-500" />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
              className="w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div id="createProductFormFile" className="flex items-center space-x-2">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handelimage}
              className="border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <Button
            id="createProductBtn"
            type="submit"
            isDisabled={btnop ? true : false}
            className="p-4 rounded-md text-center m-auto w-20"
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
