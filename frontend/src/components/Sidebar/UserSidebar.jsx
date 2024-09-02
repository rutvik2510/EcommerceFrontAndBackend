import React, { useState } from 'react';
import { FiMenu, FiBox, FiShoppingCart, FiHeart, FiUser, FiLogOut } from 'react-icons/fi';

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
          <span className="text-xl font-semibold text-gray-800">Menu</span>
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
        <div className="flex flex-col mt-4 px-4">
          <ul className="space-y-1">
            <li>
              <a
                href="/dashboard"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiBox className="mr-3" size={18} />
                Products
              </a>
            </li>

            <li>
              <a
                href="/orders"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiShoppingCart className="mr-3" size={18} />
                My Orders
              </a>
            </li>

            <li>
              <a
                href="/cart"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiShoppingCart className="mr-3" size={18} />
                Cart
              </a>
            </li>
            <li>
              <a
                href="/wishlist"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiHeart className="mr-3" size={18} />
                Wishlist
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <FiUser className="mr-3" size={18} />
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Logout Section */}
        <div className="mt-auto px-4 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <FiLogOut className="mr-3" size={18} />
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
