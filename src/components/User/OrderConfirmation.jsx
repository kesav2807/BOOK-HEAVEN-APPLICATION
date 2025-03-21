import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, totalPrice, paymentMethod, paymentId } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-lg bg-white p-6 shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold text-green-600">Order Confirmed!</h2>
        <p className="text-gray-600">Your payment was successful.</p>

        {/* Order Details */}
        <div className="mt-4 text-left">
          <p><strong>Payment ID:</strong> {paymentId}</p>
          <p><strong>Total Amount:</strong> ${totalPrice}</p>
          <p><strong>Payment Method:</strong> {paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
