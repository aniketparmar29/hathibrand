import React ,{useEffect, useState}from "react";
import { Box} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../Redux/AdminReducer/actions";
import Aos from "aos"
import "aos/dist/aos.css"
import { useAlert } from "react-alert";
 
 function ProductList() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.AdminReducer.products);
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Image
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Name
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Price
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Stock
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Weight
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Category
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Edit/Delete
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {products && products.map((el) => (
      <tr key={el.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img className="h-10 w-10 rounded-full" src={el.image} alt="" />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.name}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-900">₹{el.price.toFixed(2)}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${el.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {el.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {el.Category}
        </td>
        <td className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button onClick={()=>delpro(el.id)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
    </>
  );
}

export default ProductList;

