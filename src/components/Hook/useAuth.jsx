import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setLoader(false);
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    return new Promise((resolve) => {
      localStorage.removeItem("user");
      setCurrentUser(null);
      Swal.fire("Logged Out", "You have successfully logged out!", "success");
      navigate("/");
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loader }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
