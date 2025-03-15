import Signup from "../../pages/signUp";
import Login from "../../pages/logIn";
import HomePage from "../../pages/home";
import AuthPage from "../../pages/auth";
import React from "react";

const routes = [
  {
    path: "/",
    element: <AuthPage />, // Default route
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/home",
    element: <HomePage />

  }
];

export default routes;