import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Uploadimage from '../components/ProductImageUpload';

const AddProduct = () => {
  //for category
  const [categories, setCategories] = useState([]);

  //for error handle
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

//for image upload
  const [image, setimageFile] = useState(null);
  const [uploadedImageUrl, setuploadedImageUrl] = useState('');

  const [formData, setFormData] = useState({
    name: '',  // Ensure all fields are initialized to prevent null value issues
    image:'',
    category: '',
    price: '',
    available: '',
    quantity: '',
  });



  // for fatching category 
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
  

  // for handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update state based on input name
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
        setError('User is not authenticated.');
        return;
    }

    if (!uploadedImageUrl) {
        setError('Please upload an image before adding the product.');
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('available', formData.available);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('image', uploadedImageUrl); // Use the uploaded image URL

    try {
        const response = await axios.post('http://localhost:5000/api/product/addProducts', formDataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Response:', response.data);
        setSuccess('Product added successfully!');
        
        // Reset form fields
        setFormData({
          name: '',
          category: '',
          price: '',
          available: '',
          quantity: '',
        });
        setimageFile(null);
        setuploadedImageUrl('');
        setError(null);
    } catch (err) {
        console.error('Error details:', err.response ? err.response.data : err.message);
        setError('Error adding product.');
        setSuccess(null);
    }
};


  
  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container flex flex-col items-center mx-auto px-4 py-8 max-w-lg">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"  // Added name attribute to bind the input with formData
            className="mt-1 block h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productName"
            value={formData.name}  // Ensure value is linked to formData state
            onChange={handleChange}  // Ensure onChange is set to handleChange function
            required
          />
        </div>

        <div className="form-group">
          <Uploadimage
           image={image} 
           setimageFile={setimageFile} 
           uploadedImageUrl={uploadedImageUrl} 
           setuploadedImageUrl={setuploadedImageUrl} 
            />
        
        </div>

        <div className="form-group">
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"  // Added name attribute to bind the input with formData
            className="mt-1 block h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productCategory"
            value={formData.category}  // Ensure value is linked to formData state
            onChange={handleChange}  // Ensure onChange is set to handleChange function
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
            name="price"  // Added name attribute to bind the input with formData
            className="mt-1 block h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productPrice"
            value={formData.price}  // Ensure value is linked to formData state
            onChange={handleChange}  // Ensure onChange is set to handleChange function
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productAvailable" className="block text-sm font-medium text-gray-700">Available</label>
          <select
            name="available"  // Added name attribute to bind the input with formData
            className="mt-1 block h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productAvailable"
            value={formData.available}  // Ensure value is linked to formData state
            onChange={handleChange}  // Ensure onChange is set to handleChange function
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
            name="quantity"  // Added name attribute to bind the input with formData
            className="mt-1 block h-8 bg-white w-full border-2 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="productQuantity"
            value={formData.quantity}  // Ensure value is linked to formData state
            onChange={handleChange}  // Ensure onChange is set to handleChange function
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
