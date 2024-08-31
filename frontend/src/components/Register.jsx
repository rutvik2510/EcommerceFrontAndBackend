// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', mobileNumber: '' , role: ''});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log form data to ensure it's correct

    try {
      const response = await axios.post(`http://localhost:5000/api/user/register`, formData);
      console.log('Response:', response); // Log the response to ensure it’s received
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); // Better error handling
      alert('Error during registration');
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        <div className='mb-4'>
        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role </label>
      <select id="role" name='role'  value={formData.role} onChange={handleChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight" required>
        <option value=""></option>
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
      </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
