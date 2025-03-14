import Signup from "../../pages/signUp";
import Login from "../../pages/logIn";
import HomePage from "../../pages/home";
import React from "react";

const routes = [
  {
    path: "/",
    element: <Signup />, // Default route
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/home",
    element: <HomePage />

  }
];

export default routes;