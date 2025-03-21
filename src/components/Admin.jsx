// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from './Footer';
// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogin = (e) => {
//     e.preventDefault(); // Prevent page reload

//     // Hardcoded credentials for admin
//     if (email === "admin@gmail.com" && password === "admin123") {
//       alert("Login Successful!");
//       navigate("/AdminLanding"); // Navigate to the admin product management page
//     } else {
//       alert("Invalid credentials, please try again.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <section className="about-us bg-white min-h-screen flex items-center dark:bg-slate-900 dark:text-white">
//     <div>
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
// </section>
//  <Footer />
//   </>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating authentication (replace with API request)
    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        alert("Login Successful!");
        navigate("/Adminhome");
      } else {
        alert("Invalid credentials, please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 mt-1 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 mt-1 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminLogin;
