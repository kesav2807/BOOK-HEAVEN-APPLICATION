import { useState, useEffect } from "react";
import useAuth from "./useAuth";

const useUser = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetch(`/api/users/${currentUser.id}`)
        .then((res) => res.json())
        .then((data) => setUserDetails(data))
        .catch((err) => console.error("Error fetching user details:", err));
    }
  }, [currentUser]);

  return { currentUser: userDetails || currentUser };
};

export default useUser;
