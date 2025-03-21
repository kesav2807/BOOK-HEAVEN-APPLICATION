import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Signup from "./components/Signup";
import Contact from "./components/contact";
import { useAuth } from "./context/AuthProvider";
import Courses from "./courses/Courses";
import Home from "./home/Home";
// import AdminLogin from "./components/Admin";

// import MyOrders from "./components/Admin/MyOrders";
import Cart from "./components/User/Cart";
import Checkout from "./components/User/Checkout";
import Payment from "./components/User/Payment";
import OrderSummary from "./components/User/OrderConfirmation";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminHome";
import AdminAddBook from "./components/Admin/AdminAddbook";
import BookList from "./components/Admin/AdminBookList";
import UserList from "./components/Admin/Userlist";
import OrderList from "./components/Admin/Orderlist";



function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
    {/* <Navbar/> */}
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/" element={<Contact />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/About" element={<About/>}/>
          {/* <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/Adminhome" element={<AdminHom/>}/>
          <Route path="/myOrder" element={<MyOrders/>}/> */}
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/payment" element={<Payment/>} />
          <Route path="/order-confirmation" element={<OrderSummary />} />
          <Route path="/AdmimLogin" element={<AdminLogin/>}/>
          <Route path="/AdmimHome" element={<AdminDashboard/>}/>
          <Route path="/Adminaddbooks" element={<AdminAddBook/>}/>
          <Route path="/AdminBookList" element={<BookList/>}/>
          <Route path="/UserList" element={<UserList/>}/>
          <Route path="/Orderlist" element={<OrderList/>}/>




        </Routes>
        <Toaster />
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default App;