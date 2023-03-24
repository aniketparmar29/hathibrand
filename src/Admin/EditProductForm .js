import React from 'react';

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [name, setName] = React.useState(product.name);
  const [price, setPrice] = React.useState(product.price);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      id: product.id,
      name,
      price,
    });
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-medium mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
