import React from 'react'
import { Box,Button,Image,Badge } from '@chakra-ui/react'
function ProductCard({el,redir,doIt}) {
  let mrp=el.price+100;
  const discount=Math.floor(((mrp-el.price)/mrp)*100);
  return (
    <Box
    w="90%"
    mx={"auto"}
    my={"3"}
    borderWidth="1px"
    borderRadius="lg"
  overflow="hidden"
  p="3"
  className='shadow-lg hover:scale-105 shadow-[#5E0E42]  duration-300'
  onClick={()=>redir(el.id)}
>
  <Image src={el.image} alt={el.name} height="240px" width={"100%"}/>

  <Box p="6">
    <Box d="flex" alignItems="baseline">
      <Badge borderRadius="full"  colorScheme="teal">
        New
      </Badge>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="sm"
        textTransform="uppercase"
        mt="2"
      >
        {el.weight>=1000?el.weight/1000:el.weight}{el.weight>=1000?"kg":"gm"}
      </Box>
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
      isTruncated
    >
      <Box as="span" pr={"2"} color="gray.600" fontSize="sm">
        Discount: 
      </Box>
      {discount}%
    </Box>

    <Box>
      <Box as="span" color="gray.600" fontSize="sm">
        MRP:
      </Box>
      <Box as="span" color="gray.700" fontSize="sm" className='line-through' ml="2">
      ₹ {el.price + 100}
      </Box>
      <Box as="span" color="gray.700" fontSize="sm" fontWeight="bold" ml="2">
      ₹ {el.price}
      </Box>
    </Box>

    <Box d="flex" mt="2" alignItems="center">
      <Box as="span" color="gray.600" fontSize="sm">
        In stock
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
        View
      </Button>
    </Box>
  </Box>
</Box>

  )
}

export default ProductCard