import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import "../src/styles/App.css"
function AppRoutes() {
  return useRoutes(routes); // Let `useRoutes` handle everything
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppRoutes />
      </div>
    </Router>
  );
}


export default App;