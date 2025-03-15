import AuthForm from "../components/authForm";
import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const handleSignup = async (e, { firstName, lastName, email, password }) => {
    e.preventDefault();

    const userData = { firstName, lastName, email, password };

    try {
        const response = await fetch("http://localhost:5008/api/auth/signup", { 
            method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        // Redirect user to login or home page
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <AuthForm type="signup" onSubmit={handleSignup} />

    </div>
  );
};

export default Signup;