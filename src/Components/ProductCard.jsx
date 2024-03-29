import React,{useEffect} from "react";
import { Box, Button, Image, Badge } from "@chakra-ui/react";
import { useDispatch,useSelector } from "react-redux";
import { postcart } from "../Redux/CartReducer/action";
import { useNavigate } from "react-router-dom";
import Aos from "aos"
 import "aos/dist/aos.css"
 import { useAlert } from "react-alert";
 function ProductCard({ el, redir, setshowalert }) {
   const navigate = useNavigate();
  const alert = useAlert();
  let mrp = el.price + 100;
  const dispatch = useDispatch();
  const isAuth= useSelector((state)=>state.userAuth.isAuth)

  const discount = Math.floor(((mrp - el.price) / mrp) * 100);

  let user = window.localStorage.getItem("user") || {};
  if (user !== {}) {
    try {
      user = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from local storage", error);
      user = { role: "hello" };
    }
  } else {
    user = { role: "hello" };
  }

  const cart = {
    pr_name: el.name,
    pr_price: el.price,
    pr_que: 1,
    pr_id: el.id,
    pr_img: el.image,
    pr_category:el.Category,
    pr_weight: el.weight,
    user_id: user.id,
  };
  const addcart = () => {
    if(isAuth===false){
      alert.error("Please Login To Add Product")
    navigate(`/login`);
      return;
    }
    dispatch(postcart(cart));
    setshowalert(true);
  };
  useEffect(() => {
    Aos.init({ duration: 1000});
  }, [alert]);

  return (
    <>
      {el.stock > 0 && (
        <Box
        data-aos="fade-up"
          w="95%"
          mx={"auto"}
          my={"3"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="3"
          className="shadow-lg hover:scale-105 shadow-yellow-600  duration-300"
        >
          <Image
            src={el.image}
            alt={el.name}
            // height="240px"
            onClick={() => redir(el.id)}
            width={"100%"}
          />

          <Box p="6" onClick={() => redir(el.id)}>
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" colorScheme="teal">
                New
              </Badge>
              {el.Category === "Agarbatti" ? (
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="sm"
                  textTransform="uppercase"
                  mt="2"
                >
                  {el.weight >= 1000 ? el.weight / 1000 : el.weight}
                  {el.weight >= 1000 ? "kg" : "gm"}
                </Box>
              ) : (
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="sm"
                  textTransform="uppercase"
                  mt="2"
                >
                  {el.weight >= 1000 ? el.weight / 1000 : el.weight}
                  {el.weight >= 1000 ? "l" : "ml"}
                </Box>
              )}
            </Box>

            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {el.name}
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              color="red.600"
              isTruncated
            >
              <Box as="span" pr={"2"} color="red.600" fontSize="sm">
                Discount:
              </Box>
              {discount}%
            </Box>

            <Box>
              <Box as="span" color="gray.600" fontSize="sm">
                Price:
              </Box>
              <div >
              <Box
                as="span"
                color="gray.700"
                fontSize="sm"
                className="line-through"
                ml="2"
                >
                ₹ {el.price + 100}
              </Box>
              <Box
                as="span"
                color="gray.900"
                fontSize="lg"
                className="font-extrabold"
                ml="2"
                >
                ₹ {el.price}
              </Box>
                </div>
            </Box>

           
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Button
              borderRadius={0}
              width={"100%"}
              className="bg-red-700"
              colorScheme="#440430"
              color={"white"}
              onClick={addcart}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProductCard;
