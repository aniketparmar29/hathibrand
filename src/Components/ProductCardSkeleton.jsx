import { Box, Skeleton } from '@chakra-ui/react';

 const ProductCardSkeleton = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p="3" overflow="hidden">
      <Skeleton height="200px" width="200px"/>

      <Box p="6">
        <Skeleton height="20px" width="100%" my="2" />

        <Skeleton height="40px" width="100%" my="2" />

        <Skeleton height="20px" width="50%" my="2" />

        <Skeleton height="20px" width="70%" my="2" />

        <Skeleton height="30px" width="100%" my="2" />
      </Box>
    </Box>
  );
};

export default ProductCardSkeleton;