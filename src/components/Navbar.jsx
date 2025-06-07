import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, LogIn, Mail } from "lucide-react"; // Icons

const stockTickers = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA", "META", "NFLX", "GME"];

function Navbar() {
  const [search, setSearch] = useState("");
  const [filteredTickers, setFilteredTickers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loginData, setLoginData] = useState({ name: "", email: "", password: "" });
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });

  const navigate = useNavigate();

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    setFilteredTickers(value ? stockTickers.filter((t) => t.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleSelect = (ticker) => {
    navigate(`/stock/${ticker}`);
  };

  const handleInputChange = (e, setter) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async () => {
    if (!contactData.name || !contactData.email || !contactData.message) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setContactData({ name: "", email: "", message: "" });
        setShowContactModal(false);
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message.");
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative"
      style={{
        backgroundImage: `url("/mh.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Animated Heading */}
      <motion.h1
        className="text-7xl font-bold mb-6 relative z-10 flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <span className="text-red-600">Stock</span>
        <span className="text-white">Scope</span>
      </motion.h1>

      {/* Search Bar */}
      <motion.div
        className="form-control relative w-full max-w-md z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search for a stock..."
          className="input input-bordered w-full text-black"
          value={search}
          onChange={handleSearch}
        />
        {filteredTickers.length > 0 && (
          <ul className="absolute left-0 mt-2 w-full bg-white text-black border border-gray-200 rounded shadow-lg z-10">
            {filteredTickers.map((ticker) => (
              <li key={ticker} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(ticker)}>
                {ticker}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Profile Section */}
      <div className="absolute top-4 right-4 flex items-center gap-4 z-10">
        {/* Profile Image */}
        <div className="relative">
          <div
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <img src="/ph.jpeg" alt="User Profile" className="w-full h-full object-cover" />
          </div>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 p-4 rounded-lg shadow-lg text-white z-20">
              <ul>
                <li className="p-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2" onClick={() => setShowLoginModal(true)}>
                  <LogIn size={18} /> Login
                </li>
                <li className="p-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2" onClick={() => setShowContactModal(true)}>
                  <Mail size={18} /> Contact Us
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Feature Menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg bg-gray-800">
          <Menu size={30} color="white" />
        </button>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
            <input type="text" name="name" placeholder="Enter your name" className="w-full p-3 mb-3 rounded text-white bg-gray-800"
              value={contactData.name} onChange={(e) => handleInputChange(e, setContactData)} />
            <input type="email" name="email" placeholder="Enter your email" className="w-full p-3 mb-3 rounded text-white bg-gray-800"
              value={contactData.email} onChange={(e) => handleInputChange(e, setContactData)} />
            <textarea name="message" placeholder="Your complaint or suggestion..." className="w-full p-3 mb-4 rounded text-white bg-gray-800"
              value={contactData.message} onChange={(e) => handleInputChange(e, setContactData)} />

            <button onClick={handleContactSubmit} className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg text-lg font-bold transition">
              Send
            </button>

            <button onClick={() => setShowContactModal(false)} className="w-full mt-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg text-lg font-bold transition">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
