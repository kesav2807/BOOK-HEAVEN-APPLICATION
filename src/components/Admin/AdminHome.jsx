import React from "react";
import { FaBook, FaList, FaUsers, FaShoppingCart, FaSignOutAlt, FaChartBar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center"><FaChartBar className="mr-2"/>Admin Panel</h2>
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
          <h2 className="text-xl font-semibold flex items-center"><FaChartBar className="mr-2"/> Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Admin</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center">
              <FaSignOutAlt className="mr-2"/> Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          <h3 className="text-lg font-semibold mb-4">Welcome, Admin!</h3>
          <p className="text-gray-600">Manage your website efficiently.</p>

          {/* Admin Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <FaBook className="text-blue-500 text-3xl mr-4"/>
              <div>
                <h4 className="text-lg font-semibold">Total Books</h4>
                <p className="text-gray-600">150</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <FaUsers className="text-green-500 text-3xl mr-4"/>
              <div>
                <h4 className="text-lg font-semibold">Registered Users</h4>
                <p className="text-gray-600">340</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <FaShoppingCart className="text-yellow-500 text-3xl mr-4"/>
              <div>
                <h4 className="text-lg font-semibold">Pending Orders</h4>
                <p className="text-gray-600">20</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
