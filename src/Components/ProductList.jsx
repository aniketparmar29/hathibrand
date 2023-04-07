import React ,{useEffect}from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Redux/ProductReducer/action";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Box } from "@chakra-ui/react";
import Aos from "aos"
 import "aos/dist/aos.css"
import { useAlert } from "react-alert";
import { useState } from "react";
function ProductList({ setshowalert, showalert }) {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ProductReducer.product);
  const isLoading = useSelector((state) => state.ProductReducer.isLoading);
  
  const redir = (id) => {
    navigate(`singlepage/${id}`);
  };
  useEffect(() => {
    if(showalert===true){
      alert.success("Product Added To Cart")
      setshowalert(!showalert)
    }
    Aos.init({ duration: 1000});
  }, [alert,showalert,setshowalert]);

  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  
  const handleWeightChange = (e) => {
    setSelectedWeight(e.target.value);
    console.log(selectedWeight)
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };



 const filterProducts = (product) => {
   if (selectedWeight === "htl") {
    return product.sort((a, b) => b.weight - a.weight);
  } else if (selectedWeight === "lth") {
   return product.sort((a, b) => a.weight - b.weight);
  }

  if (selectedPrice === "htl") {
    return product.sort((a, b) => b.price - a.price);
  } else if (selectedPrice === "lth") {
   return product.sort((a, b) => a.price - b.price);
  }
  return product;
};

React.useEffect(() => {
  dispatch(getProducts());
}, [dispatch]);
  return (
    <>
      <div >
           <div>
        <select onChange={handleWeightChange}>
          <option value="">Sort by weight</option>
          <option value="htl">High to low</option>
          <option value="lth">Low to high</option>
        </select>
        <select onChange={handlePriceChange}>
          <option value="">Sort by price</option>
          <option value="htl">High to low</option>
          <option value="lth">Low to high</option>
        </select>
      </div>
      <div>
       
      </div>
        
       
        
        {isLoading?(
         
          <div data-aos="fade-up" className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-wrap gap-3">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex justify-center items-center p-5">
                <ProductCardSkeleton key={index} />
              </div>
            ))}
          </div>
        ):<SimpleGrid data-aos="fade-up" columns={[1, 2, 4]} gap="3">
        {filterProducts &&
          product.map((el) => (
            <ProductCard
              el={el}
              setshowalert={setshowalert}
              key={el.id}
              redir={redir}

            />
          ))}
      </SimpleGrid>}
        
      </div>
    </>
  );
}

export default ProductList;
