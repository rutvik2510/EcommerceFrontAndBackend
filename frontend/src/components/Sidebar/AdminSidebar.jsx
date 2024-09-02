import React, { useState } from 'react';
import { FiMenu, FiLogOut, FiUser, FiShoppingCart, FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear token and user data from localStorage or context
    localStorage.removeItem('token');
    // Redirect to login page or home
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-baseline justify-between bg-white px-4 py-2 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-800"></span>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-gray-800 focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto bg-white border-r border-gray-200 w-64 transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0`}
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center p-6 bg-gray-100 border-b border-gray-200">
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl uppercase">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {user.name || 'Username'}
          </h2>
          <p className="text-gray-600">{user.role || 'User Role'}</p>
        </div>

        {/* Navigation Sections */}
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/products"
                className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <FiBox className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-category"
                className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <FiShoppingCart className="mr-3" />
                Add Category
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <FiUser className="mr-3" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="mt-auto flex items-center justify-center p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full justify-center"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
