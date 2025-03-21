import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, image, quantity, totalPrice } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    addressType: "Home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { formData, totalPrice, title, image, quantity } });
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Checkout</h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={image}
            alt={title}
            className="h-40 w-40 object-contain rounded-lg shadow-md border"
          />
          <div className="flex-1 text-gray-900 dark:text-gray-300">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-lg mt-3">Quantity: <span className="font-bold">{quantity}</span></p>
            <p className="text-lg mt-2">Total Price: <span className="font-bold text-green-600 dark:text-green-400">${totalPrice}</span></p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-6 text-gray-900 dark:text-white">Delivery Address</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <input type="text" name="phone" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <input type="text" name="address" placeholder="Address (Area and Street)" value={formData.address} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <input type="text" name="city" placeholder="City/District/Town" value={formData.city} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <select name="state" value={formData.state} onChange={handleChange} required className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500">
            <option value="">--Select State--</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
          <input type="text" name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleChange} className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <input type="text" name="altPhone" placeholder="Alternate Phone (Optional)" value={formData.altPhone} onChange={handleChange} className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500" />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-gray-900 dark:text-gray-300">
              <input type="radio" name="addressType" value="Home" checked={formData.addressType === "Home"} onChange={handleChange} />
              Home (All day delivery)
            </label>
            <label className="flex items-center gap-2 text-gray-900 dark:text-gray-300">
              <input type="radio" name="addressType" value="Work" checked={formData.addressType === "Work"} onChange={handleChange} />
              Work (Delivery between 10 AM - 5 PM)
            </label>
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all shadow-md text-lg font-semibold">
            SAVE AND DELIVER HERE
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Checkout;