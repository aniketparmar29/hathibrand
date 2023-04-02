import { useEffect, useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { EditProduct } from '../Redux/AdminReducer/actions';
import { useAlert } from "react-alert";
const EditProductModal = ({ product, closeModal }) => {
  const dispatch = useDispatch();
  const editsuccess = useSelector((state) => state.AdminReducer.editsuccess);
  const alert = useAlert();

  const [name, setName] = useState(product.name);
  const [weight, setWeight] = useState(product.weight);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);

  const handleNameChange = (e) => setName(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleStockChange = (e) => setStock(e.target.value);

  const pro = {
    name,
    weight: Number(weight),
    stock: Number(stock), 
    price: Number(price)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(EditProduct(product.id,pro));
    closeModal();
  };
useEffect(() => {
  
},[])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg w-96">
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <label htmlFor="name" className="block mb-2 font-medium">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-full border-gray-300 rounded-md shadow-sm mb-4"
              value={name}
              onChange={handleNameChange}
              required
            />

            <label htmlFor="weight" className="block mb-2 font-medium">
              Weight:
            </label>
            <input
              id="weight"
              type="number"
              step="0.01"
              min="0"
              className="w-full border-gray-300 rounded-md shadow-sm mb-4"
              value={weight}
              onChange={handleWeightChange}
              required
            />
            <label htmlFor="weight" className="block mb-2 font-medium">
              stock:
            </label>
            <input
              id="stock"
              type="number"
              step="0.01"
              min="0"
              className="w-full border-gray-300 rounded-md shadow-sm mb-4"
              value={stock}
              onChange={handleStockChange}
              required
            />

            <label htmlFor="price" className="block mb-2 font-medium">
              Price:
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              className="w-full border-gray-300 rounded-md shadow-sm mb-4"
              value={price}
              onChange={handlePriceChange}
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              className="ml-4 text-gray-500 hover:text-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
