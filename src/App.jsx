import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StockDetail from "./components/StockDetail";
import Tutorial from "./components/Tutorial";  // Import Tutorial Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/stock/:ticker" element={<StockDetail />} />
        <Route path="/tutorial" element={<Tutorial />} /> {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
