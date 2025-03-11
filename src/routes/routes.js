import Signup from "../../pages/signUp";
import Login from "../../pages/logIn";
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
];

export default routes;