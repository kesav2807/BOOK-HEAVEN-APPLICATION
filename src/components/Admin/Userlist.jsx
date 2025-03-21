import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaList, FaUsers, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://book-store-backend-fxe2.onrender.com/user/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center"><FaUsers className="mr-2"/> User List</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center">
            <FaSignOutAlt className="mr-2"/> Logout
          </button>
        </header>

        {/* Main Content */}
        <main className="p-8 flex-1 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">All Users</h3>

          {loading && <p className="text-center">Loading users...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Full Name</th>
                    <th className="px-4 py-2 border">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="text-center border hover:bg-gray-50 transition">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{user.fullname}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserList;
