import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const formData = location.state?.formData || {};
  const totalPrice = location.state?.totalPrice || "0.00";
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Handle Payment Submission
  const handlePayment = async () => {
    try {
      // Send payment data to the backend
      const response = await axios.post("https://book-store-backend-fxe2.onrender.com/checkout", {
        ...formData,
        totalPrice,
        paymentMethod,
      });

      alert("Payment Successful!");

      // Redirect to Order Confirmation page with Payment ID
      navigate("/order-confirmation", { 
        state: { 
          formData, 
          totalPrice, 
          paymentMethod, 
          paymentId: response.data.paymentId 
        } 
      });
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment Failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Payment Details</h2>

        {/* Display Total Price */}
        <p className="text-xl font-semibold text-center mb-4">
          Total Amount: <span className="text-orange-500">${totalPrice}</span>
        </p>

        {/* Address Details */}
        <div className="border p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Delivery Address:</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
        </div>

        {/* Payment Method Selection */}
        <h3 className="text-lg font-semibold mb-2">Choose Payment Method</h3>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="card" 
              checked={paymentMethod === "card"} 
              onChange={() => setPaymentMethod("card")} 
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="radio" 
              name="paymentMethod" 
              value="cod" 
              checked={paymentMethod === "cod"} 
              onChange={() => setPaymentMethod("cod")} 
            />
            Cash on Delivery
          </label>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

export default Payment;
