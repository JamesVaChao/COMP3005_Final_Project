import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DevPage from "./pages/DevPage.js"
import HomePage from "./pages/HomePage"

export const App = ()=> {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="DevPage" element={<DevPage />} />
      </Routes>
    </div>
  );
  
}
export default App

// App.js

