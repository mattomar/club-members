import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "./signUp";
import Login from "./logIn";
import "../src/styles/auth.css";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleGuestAccess = () => {
    localStorage.removeItem("token"); // Clear any stored login token
    navigate("/home"); // Navigate to home as a guest
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        {showLogin ? <Login /> : <Signup />}
        <p className="toggle-link" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </p>
        
        {/* Guest Access Button */}
        <button className="guest-access" onClick={handleGuestAccess}>
          Continue as Guest
        </button>
      </div>

      {/* Right Section - Enhanced Description */}
      <div className="auth-description">
        <h1 className="auth-title">Welcome to the <span>Exclusive Club</span></h1>
        <p className="auth-subtitle">A private space where members can post and interact.</p>
        
        <div className="features">
          <h2>Access Levels</h2>
          <ul>
            <li><span>👤 Guest Access:</span> View messages but cannot post or see timestamps.</li>
            <li><span>📝 Member Access:</span> Post messages, view timestamps, and see usernames.</li>
            <li><span>👑 Admin Privileges:</span> Manage messages, including deleting inappropriate posts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;