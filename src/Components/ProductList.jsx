import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Redux/ProductReducer/action";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Alert from "../Components/Alert";
function ProductList({ setshowalert, showalert }) {
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
  return (
    <>
      <div>
        {isLoading?(
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-wrap gap-3">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="flex justify-center items-center p-5">
                <ProductCardSkeleton key={index} />
              </div>
            ))}
          </div>
        ):<SimpleGrid columns={[1, 2, 4]} gap="3">
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
      {showalert && <Alert msg="Item Add To Cart" bgColor="bg-green-500" />}
    </>
  );
}

export default ProductList;
