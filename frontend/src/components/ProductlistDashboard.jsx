// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ productList=[], addToCart }) => {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-2 py-10 md:grid-cols-2 lg:grid-cols-4">
      {productList.map((product) => (
        <div key={product.prodId} className="rounded-md border">
          <img
            src={product.image}
            alt={product.prodName} // Use the product name as the alt text for better accessibility
            className="aspect-[16/9] w-full p-[2px] rounded-md md:aspect-auto md:h-[300px] lg:h-[250px]"
          />
          <div className="p-4">
            <h1 className="text-lg font-semibold">{product.prodName}</h1>
            <p className="mt-3 text-sm text-gray-600">{product.proddes}</p>

            <div className="mt-3 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Colors:</span>
              <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
              <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
              <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
            </div>

            <div className="mt-5 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Size:</span>
              <span className="cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                8 UK
              </span>
              <span className="cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                9 UK
              </span>
              <span className="cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                10 UK
              </span>
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              onClick={ () => addToCart(product)}
           >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;

