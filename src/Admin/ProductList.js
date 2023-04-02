import React ,{useEffect, useState}from "react";
import { SimpleGrid} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct} from "../Redux/AdminReducer/actions";
import { getProducts } from "../Redux/ProductReducer/action";
import Aos from "aos"
import "aos/dist/aos.css"
import { useAlert } from "react-alert";
import ProductCardSkeleton from "../Components/ProductCardSkeleton";
import ProductCardad from "./ProductCardad";
 
 function ProductList() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ProductReducer.product);
  const isLoading = useSelector((state) => state.AdminReducer.isLoading);
  const editsuccess = useSelector((state) => state.AdminReducer.editsuccess);

  // const delpro = (id) =>{
  //   dispatch(deleteProduct(id));
  //   dispatch(getProducts());
  // }

 useEffect(() => {
    dispatch(getProducts());
  }, [dispatch,editsuccess]);
  useEffect(() => {
    // if(isdelete===true){
    //   alert.success("Product is deleted")
    // }
    Aos.init({ duration: 1000});
  }, [alert]);
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
            <ProductCardad
              el={el}
              key={el.id}
              // delpro={delpro}
            />
          ))}
      </SimpleGrid>}
        
      </div>
    </>
  );
}

export default ProductList;

