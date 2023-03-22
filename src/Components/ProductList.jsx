import React ,{useEffect}from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Redux/ProductReducer/action";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Aos from "aos"
 import "aos/dist/aos.css"
import { useAlert } from "react-alert";
function ProductList({ setshowalert, showalert }) {
  const alert = useAlert();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ProductReducer.product);
  const isLoading = useSelector((state) => state.ProductReducer.isLoading);

  const redir = (id) => {
    navigate(`singlepage/${id}`);
  };
 
  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    if(showalert===true){
      alert.success("Product Added To Cart")
      setshowalert(!showalert)
    }
    Aos.init({ duration: 1000});
  }, [alert,showalert]);


  return (
    <>
      <div >
        {isLoading?(
          <div data-aos="fade-up" className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-wrap gap-3">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex justify-center items-center p-5">
                <ProductCardSkeleton key={index} />
              </div>
            ))}
          </div>
        ):<SimpleGrid data-aos="fade-up" columns={[1, 2, 4]} gap="3">
        {product &&
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
