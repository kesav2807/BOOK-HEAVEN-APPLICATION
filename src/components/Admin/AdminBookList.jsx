import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaList, FaUsers, FaShoppingCart, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4001/book");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`https://book-store-backend-fxe2.onrender.com/book/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaBook className="mr-2"/> Admin Panel
        </h2>
        <nav>
          <ul className="space-y-4">
            <li className="p-3 hover:bg-blue-700 rounded transition flex items-center">
              <FaBook className="mr-2"/><a href="/AdminHome">Dashboard</a>
            </li>
            <li className="p-3 hover:bg-blue-700 rounded transition flex items-center">
              <FaBook className="mr-2"/><a href="/AdminAddBooks">Add Books</a>
            </li>
            <li className="p-3 hover:bg-blue-700 rounded transition flex items-center">
              <FaList className="mr-2"/><a href="/AdminBookList">Book List</a>
            </li>
            <li className="p-3 hover:bg-blue-700 rounded transition flex items-center">
              <FaUsers className="mr-2"/><a href="/UserList">User List</a>
            </li>
            <li className="p-3 hover:bg-blue-700 rounded transition flex items-center">
              <FaShoppingCart className="mr-2"/><a href="/OrderList">User Orders</a>
            </li>
            <li className="p-3 hover:bg-red-700 rounded transition flex items-center" onClick={handleLogout}>
              <FaSignOutAlt className="mr-2"/> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center">
            <FaBook className="mr-2"/> Book List
          </h2>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center"
          >
            <FaSignOutAlt className="mr-2"/> Logout
          </button>
        </header>

        {/* Main Content */}
        <main className="p-8 flex-1">
          <h3 className="text-lg font-semibold mb-4">All Books</h3>

          {loading && <p className="text-center">Loading books...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="bg-white p-6 rounded-lg shadow">
              {/* Scrollable Container */}
              <div className="overflow-y-auto max-h-[500px] border border-gray-300 rounded-lg">
                <table className="min-w-full border-collapse">
                  <thead className="sticky top-0 bg-gray-200 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">ID</th>
                      <th className="px-4 py-2 border">Book Name</th>
                      <th className="px-4 py-2 border">Price</th>
                      <th className="px-4 py-2 border">Category</th>
                      <th className="px-4 py-2 border">Title</th>
                      <th className="px-4 py-2 border">Image</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book, index) => (
                      <tr key={book._id} className="text-center border hover:bg-gray-50 transition">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{book.name}</td>
                        <td className="px-4 py-2 border">${book.price}</td>
                        <td className="px-4 py-2 border">{book.category}</td>
                        <td className="px-4 py-2 border">{book.title}</td>
                        <td className="px-4 py-2 border">
                          <img src={book.image} alt={book.name} className="h-12 mx-auto rounded" />
                        </td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition flex items-center"
                          >
                            <FaTrash className="mr-2"/> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookList;
