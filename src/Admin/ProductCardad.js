import React,{useState,useEffect} from "react";
import { Box, Button, Image, Badge } from "@chakra-ui/react";
import { useDispatch,useSelector } from "react-redux";
import Aos from "aos"
import "aos/dist/aos.css"
import { useAlert } from "react-alert";
import EditProductModal from './EditProductModal'
function ProductCardad({ el}) {
  const alert = useAlert();
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
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCloseModal = () => setIsEditing(false);

  useEffect(() => {
    Aos.init({ duration: 1000});
  }, [alert]);

  return (
    <>
      
        <Box
        data-aos="fade-up"
          w="95%"
          mx={"auto"}
          my={"3"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="3"
          className="shadow-lg hover:scale-105 shadow-[#5E0E42]  duration-300"
        >
          <Image
            src={el.image}
            alt={el.name}
            // height="240px"
            width={"100%"}
          />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" colorScheme="teal">
                Stock:{el.stock}
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
                as="span"
                color="gray.700"
                fontSize="sm"
                fontWeight="bold"
                ml="2"
              >
              ₹{el.price}
              </Box>

           
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Button
              borderRadius={0}
              width={"100%"}
              bgColor="#5E0E42"
              colorScheme="#440430"
              color={"white"}
            >
              Delete
            </Button>
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Button
              borderRadius={0}
              width={"100%"}
              bgColor="#5E0E42"
              colorScheme="#440430"
              color={"white"}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </Box>
          {isEditing && (
        <EditProductModal product={el} closeModal={handleCloseModal} />
      )}
        </Box>
    </>
  );
}

export default ProductCardad;
