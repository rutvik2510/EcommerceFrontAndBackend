// src/components/Navbar.jsx
import logo from '../assets/logo.png';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5000/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">
          <a className="text-xl">
            <img className="w-10 h-10" src={logo} alt="logo" />
          </a>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white"> {user.name}</span> 
            <span>{user.role== 'admin' ? (<h3>Admin</h3>):(<h3>user</h3>)}</span>
           
            <button onClick={handleLogout} className="text-white underline">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/register" className="mr-4">
              Register
            </Link>
            <Link to="/login" className="mr-4">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
