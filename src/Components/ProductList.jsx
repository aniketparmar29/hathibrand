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

  const [filterProducts, setFilterProducts] = useState(product);
  
  const handleWeightChange = (event) => {
    const value = event.target.value;
    if (value === 'htl') {
      // sort products from high to low
      setFilterProducts([...product].sort((a, b) => b.weight - a.weight));
    } else if (value === 'lth') {
      // sort products from low to high
      setFilterProducts([...product].sort((a, b) => a.weight - b.weight));
    } else {
      // default case, no sorting
      setFilterProducts([...product]);
    }
  };
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    console.log(value)
    setFilterProducts(product.filter((pro) => {
      if (value === '') {
        return true;
      }
      return pro.Category === value;
    }))
  };
  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (value === "htl") {
      // Sort high to low
      setFilterProducts([...filterProducts].sort((a, b) => b.price - a.price));
    } else if (value === "lth") {
      // Sort low to high
      setFilterProducts([...filterProducts].sort((a, b) => a.price - b.price));
    } else {
      // No sorting
      setFilterProducts(product);
    }
  };
  

React.useEffect(() => {
  dispatch(getProducts());
}, [dispatch]);
console.log(filterProducts)
  return (
    <>
    <div>
      <div className="lg:flex md:flex  justify-between items-center p-5">
  <div className="relative">
    <select 
      onChange={handleWeightChange} 
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Sort by weight</option>
      <option value="htl">High to low</option>
      <option value="lth">Low to high</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z"/></svg>
    </div>
  </div>
  <div className="relative">
    <select 
      onChange={handleCategoryChange} 
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Filter by Category</option>
      <option value="Agarbatti">Agarbatti</option>
      <option value="Cosmetic">Cosmetic</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z"/></svg>
    </div>
  </div>
  <div className="relative">
    <select 
      onChange={handlePriceChange} 
      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="">Sort by price</option>
      <option value="htl">High to low</option>
      <option value="lth">Low to high</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z"/></svg>
    </div>
  </div>
</div>

        
       
        
        {isLoading?(
         
          <div data-aos="fade-up" className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-wrap gap-3">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex justify-center items-center p-5">
                <ProductCardSkeleton key={index} />
              </div>
            ))}
          </div>
        ):<SimpleGrid data-aos="fade-up" columns={[2, 2, 4]} gap="3">
        {filterProducts &&
          filterProducts.map((el) => (
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
