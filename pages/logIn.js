import AuthForm from "../components/authForm";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e, { email, password }) => {
    e.preventDefault();

    try {
        const response = await fetch("https://club-members-server-production.up.railway.app/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login successful:", data);
            localStorage.setItem("token", data.token); // Store token
            navigate("/home"); // Redirect to homepage
        } else {
            console.error("Login failed:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };
  console.log("✅ Login Component Loaded!"); // Add this line

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
