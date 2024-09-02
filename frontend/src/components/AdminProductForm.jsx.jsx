import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/category/getAllCategory', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.categories);
      } catch (err) {
        setError('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('available', available);
    formData.append('quantity', quantity);

    try {
      await axios.post('http://localhost:5000/api/products/createProduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Product added successfully!');
      setName('');
      setImage(null);
      setCategory('');
      setPrice('');
      setAvailable(true);
      setQuantity('');
      setError(null);
    } catch (err) {
      setError('Error adding product. Please try again.');
      setSuccess(null);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-8 max-w-lg">
      <h2 className="text-2xl  font-semibold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            className="mt-1 block h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
            id="productImage"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block  h-8 bg-white w-full border-2 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            className="mt-1 block  h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productAvailable" className="block text-sm font-medium text-gray-700">Available</label>
          <select
            className="mt-1 block  h-8 bg-white w-full border-2 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productAvailable"
            value={available}
            onChange={(e) => setAvailable(e.target.value === 'true')}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            className="mt-1 block  h-8 bg-white w-full border-2 rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productQuantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="alert alert-danger bg-red-50 border border-red-500 text-red-700 p-4 rounded-md">
            {error}
            <button
              type="button"
              className="absolute top-0 right-0 p-1.5"
              onClick={handleDismiss}
              aria-label="Close"
            >
              <span className="text-red-500">&times;</span>
            </button>
          </div>
        )}

        {success && (
          <div className="alert alert-success bg-green-50 border border-green-500 text-green-700 p-4 rounded-md">
            {success}
            <button
              type="button"
              className="absolute top-0 right-0 p-1.5"
              onClick={handleDismiss}
              aria-label="Close"
            >
              <span className="text-green-500">&times;</span>
            </button>
          </div>
        )}

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
