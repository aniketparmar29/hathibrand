import React ,{useEffect, useState}from "react";
import { SimpleGrid} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../Redux/AdminReducer/actions";
import Aos from "aos"
import "aos/dist/aos.css"
import { useAlert } from "react-alert";
import ProductCardSkeleton from "../Components/ProductCardSkeleton";
import ProductCardad from "./ProductCardad";
 
 function ProductList() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.AdminReducer.products);
  const isLoading = useSelector((state) => state.AdminReducer.isLoading);
  const [isdelete,setisdelte] = useState(false)

  const delpro = (id) =>{
    setisdelte(false)
    dispatch(deleteProduct(id));
    setisdelte(true)
    dispatch(getProducts());
  }

 useEffect(() => {
    dispatch(getProducts());
  }, [dispatch,isdelete]);

  useEffect(() => {
    if(isdelete===true){
      alert.success("Product is deleted")
    }
    Aos.init({ duration: 1000});
  }, [isdelete,alert]);
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
        {products &&
          products.map((el) => (
            <ProductCardad
              el={el}
              key={el.id}
              delpro={delpro}
            />
          ))}
      </SimpleGrid>}
        
      </div>
    </>
  );
}

export default ProductList;

