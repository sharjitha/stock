import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tutorialContent = [
  {
    title: "Introduction to the Stock Market",
    content: "The stock market is a marketplace where investors buy and sell shares of publicly traded companies. It plays a crucial role in the economy by enabling companies to raise capital and investors to earn returns.",
  },
  {
    title: "Investment Basics",
    content: "Investing involves allocating resources, usually money, with the expectation of generating income or profit. Key investment instruments include stocks, bonds, mutual funds, and ETFs.",
  },
  {
    title: "How to Get Started",
    content: "To start investing, you need to set financial goals, choose a brokerage account, and learn how to place market or limit orders.",
  },
  {
    title: "Fundamental Analysis",
    content: "Fundamental analysis involves evaluating a company's financial health by studying financial statements, key ratios (P/E ratio, ROE, etc.), and overall market conditions.",
  },
  {
    title: "Technical Analysis",
    content: "Technical analysis studies price charts, trends, and indicators (such as moving averages and RSI) to predict future stock movements.",
  },
  {
    title: "Building a Portfolio",
    content: "A well-balanced portfolio includes a mix of stocks, bonds, and other assets. Diversification reduces risk and improves long-term returns.",
  },
  {
    title: "Risk Management",
    content: "Managing risk is crucial in investing. Strategies include stop-loss orders, portfolio diversification, and understanding market volatility.",
  },
];

function Tutorial() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Navbar */}
      <div className="navbar bg-gray-800 shadow-md flex justify-between px-4 py-2">
        <button className="btn btn-ghost text-lg text-white" onClick={() => navigate("/")}>Home</button>
        <h1 className="text-3xl font-bold">Stock Market Tutorial</h1>
        <button className="btn btn-error text-lg">Logout</button>
      </div>

      {/* Tutorial Content */}
      <div className="max-w-3xl mx-auto mt-6">
        {tutorialContent.map((section, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left text-xl font-semibold bg-gray-800 p-3 rounded"
              onClick={() => toggleSection(index)}
            >
              {section.title}
            </button>
            {openIndex === index && (
              <p className="bg-gray-700 p-3 mt-2 rounded">{section.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tutorial;
