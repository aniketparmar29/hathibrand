import React ,{useEffect}from "react";
import { Box} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../Redux/AdminReducer/actions";

import Aos from "aos"
 import "aos/dist/aos.css"
function ProductList({ setshowalert, showalert }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const users = useSelector((state) => state.AdminReducer.users);
  useEffect(() => {

    dispatch(getAllUsers());
  }, [dispatch]);
console.log(users)
  
  useEffect(() => {
    Aos.init({ duration: 1000});
  }, []);


  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Name
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Role
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Delete
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {users && users.map((el) => (
      <tr key={el.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.name}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.email}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.role}</span>
        </td>
        <td className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
          <button className="text-red-600 hover:text-red-900">Delete</button>
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

