import { useState, useEffect } from "react";

const useUserID = () => {
  const [userID, setUserID] = useState("");

  useEffect(() => {
    // Check if userID exists in localStorage
    let storedUserID = localStorage.getItem("userID");

    if (!storedUserID) {
      // Generate a new userID if it doesn't exist
      storedUserID = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userID", storedUserID);
    }

    // Update the state with the stored or newly generated userID
    setUserID(storedUserID);
  }, []); // Runs once on mount

  return userID; // Return the userID
};

export default useUserID;
