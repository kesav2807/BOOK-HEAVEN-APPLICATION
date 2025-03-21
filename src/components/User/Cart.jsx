import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item; // Retrieve item data from navigation state
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <>
        <Navbar />
        <section className="flex justify-center items-center h-screen bg-white dark:bg-slate-900 dark:text-white">
          <h2 className="text-2xl font-semibold">No items in cart</h2>
        </section>
        <Footer />
      </>
    );
  }

  const totalPrice = (item?.price * quantity).toFixed(2);

  // Navigate to Checkout page with book name, image, quantity, and total price
  const handleCheckout = () => {
    navigate("/checkout", { 
      state: { 
        title: item.title, 
        image: item.image, 
        quantity, 
        totalPrice 
      } 
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
     
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-2xl mt-10 transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Shopping Cart</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={item?.image}
            alt={item?.title}
            className="h-48 w-48 object-contain rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{item?.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{item?.name}</p>
            <p className="text-xl font-bold mt-2 text-pink-600 dark:text-pink-400">${item?.price.toFixed(2)}</p>

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center justify-center md:justify-start space-x-4">
              <button
                className="px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{quantity}</span>
              <button
                className="px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <p className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">Total: <span className="text-pink-600 dark:text-pink-400">${totalPrice}</span></p>

            {/* Checkout Button */}
            <button
              className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default Cart;
