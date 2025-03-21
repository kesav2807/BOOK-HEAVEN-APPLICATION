import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBook, FaList, FaUsers, FaShoppingCart, FaSignOutAlt, FaPlus } from "react-icons/fa";

const AdminAddBook = () => {
  const [bookData, setBookData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    title: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://book-store-backend-fxe2.onrender.com/book", bookData);
      setMessage("✅ Book added successfully!");
      setBookData({ name: "", price: "", category: "", image: "", title: "" }); // Reset form
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("❌ Failed to add book.");
    }
    setLoading(false);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center"><FaBook className="mr-2"/>Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
           <li className="p-3 hover:bg-blue-700 rounded transition flex items-center"><FaBook className="mr-2"/><a href="/AdmimHome">Dashboard</a></li>
                       <li className="p-3 hover:bg-blue-700 rounded transition flex items-center"><FaBook className="mr-2"/><a href="/AdminAddBooks">Add Books</a></li>
                       <li className="p-3 hover:bg-blue-700 rounded transition flex items-center"><FaList className="mr-2"/><a href="/AdminBookList">Book List</a></li>
                       <li className="p-3 hover:bg-blue-700 rounded transition flex items-center"><FaUsers className="mr-2"/><a href="/UserList">User List</a></li>
                       <li className="p-3 hover:bg-blue-700 rounded transition flex items-center"><FaShoppingCart className="mr-2"/><a href="/OrderList">User Orders</a></li>
                       <li className="p-3 hover:bg-red-700 rounded transition flex items-center" onClick={handleLogout}><FaSignOutAlt className="mr-2"/> Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center"><FaPlus className="mr-2"/> Add a New Book</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Admin</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center">
              <FaSignOutAlt className="mr-2"/> Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 flex justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center"><FaBook className="mr-2"/> Add New Book</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Book Name</label>
              <input type="text" name="name" value={bookData.name} onChange={handleChange} required
                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Price</label>
              <input type="number" name="price" value={bookData.price} onChange={handleChange} required
                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Category</label>
              <input type="text" name="category" value={bookData.category} onChange={handleChange} required
                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Image URL</label>
              <input type="text" name="image" value={bookData.image} onChange={handleChange} required
                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-400" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Title</label>
              <input type="text" name="title" value={bookData.title} onChange={handleChange} required
                className="w-full p-3 border border-gray-300 rounded focus:ring focus:ring-blue-400" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition w-full flex items-center justify-center">
              {loading ? "Adding..." : "Add Book"}
            </button>

            {message && <p className={`mt-4 text-center font-semibold ${message.includes("❌") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminAddBook;
