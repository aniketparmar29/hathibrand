import React ,{useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews} from "../Redux/AdminReducer/actions";
import SideBar from "./components/Sidebar";
import RatingBar from './RatingBar';
import Aos from "aos"
 import "aos/dist/aos.css"
function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.AdminReducer.reviews);
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);
  console.log(reviews)
  useEffect(() => {
    Aos.init({ duration: 1000});
  }, []);
  return (
    <>
        <div>
         <SideBar title="Products" />
        </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        UserName
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Reviews
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Rating
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Prodcut
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {reviews && reviews.map((el) => (
      <tr key={el.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.user_name}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.review}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <RatingBar rating={el.rating} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900">{el.pr_name}</span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
    </>
  );
}

export default Reviews;

