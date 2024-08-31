import React from 'react';

function Sidebar({ user }) {
  return (
    <div className="flex h-screen w-30 flex-col border-r bg-white">
      {/* User Profile Section */}
      <div className="flex flex-col items-center p-4 bg-gray-100">
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-14 font-bold place-content-center rounded-lg bg-gray-200 text-xs text-gray-600">
            {user.name}
          </span>
        </div>
       
       
      </div>

      {/* Navigation Sections */}
      <div className="flex flex-col mt-4 px-4">
        <ul className="space-y-1">
          <li>
            <a
              href="/dashboard"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Products 
            </a>
          </li>
          <li>
            <a
              href="/cart"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Add Category
            </a>
          </li>
         
          <li>
            <a
              href="/profile"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Profile
            </a>
          </li>
        </ul>
      </div>

      {/* Logout Section */}
      <div className="mt-auto px-4 py-4 border-t border-gray-100">
        <form action="#">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="ml-2">Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
