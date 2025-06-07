import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function StockDetail() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [shortTermData, setShortTermData] = useState([]);
  const [longTermData, setLongTermData] = useState([]);
  const [description, setDescription] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const newsRef = useRef(null);

  useEffect(() => {
    // Fetch stock news
    fetch(`http://localhost:5000/news/${ticker}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          console.error("Invalid news response:", data);
          setNews([]);
        }
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        setNews([]);
      });

    // Fetch stock prices
    fetch(`http://127.0.0.1:5000/prices/${ticker}`)
      .then(response => response.json())
      .then(data => {
        setShortTermData(Array.isArray(data.shortTerm) ? data.shortTerm : []);
        setLongTermData(Array.isArray(data.longTerm) ? data.longTerm : []);
      })
      .catch(error => {
        console.error("Error fetching prices:", error);
        setShortTermData([]);
        setLongTermData([]);
      });

    // Fetch stock description
    fetch(`http://127.0.0.1:5000/description/${ticker}`)
      .then(response => response.json())
      .then(data => {
        if (data && typeof data === "object" && !data.error) {
          setDescription(data);
        } else {
          console.error("Invalid description response:", data);
          setDescription(null);
        }
      })
      .catch(error => {
        console.error("Error fetching description:", error);
        setDescription(null);
      });

    // Dummy stock prediction (Random value between 100 and 500)
    const randomPrediction = (Math.random() * (500 - 100) + 100).toFixed(2);
    setPrediction(randomPrediction);
  }, [ticker]);

  // Automatic scrolling effect
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (newsRef.current) {
        newsRef.current.scrollLeft += 2; // Moves the news ticker to the left
      }
    }, 50); // Adjust speed here

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between relative pb-16">
      {/* Navbar */}
      <div className="navbar bg-gray-800 shadow-md flex justify-between px-4 py-2">
        <button className="btn btn-ghost text-lg text-white" onClick={() => navigate("/")}>Home</button>
        <h1 className="text-3xl font-bold">{ticker}</h1>
        <button className="btn btn-error text-lg">Logout</button>
      </div>

      {/* Stock Description */}
      <div className="p-4">
        {description ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{description.name} ({ticker})</h2>
            <p className="text-gray-300">Sector: {description.sector} | Industry: {description.industry}</p>
            <p className="text-gray-400">Market Cap: {description.marketCap}</p>
            <p className="mt-2 text-gray-200">{description.description}</p>
          </>
        ) : (
          <p className="text-gray-300">Loading company details...</p>
        )}
      </div>

      {/* Graphs Section */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Short-Term Graph */}
        <div className="p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Short-Term Graph (Daily)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={shortTermData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#222", border: "none" }} />
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Long-Term Graph */}
        <div className="p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-2">Long-Term Graph (Yearly)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={longTermData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#222", border: "none" }} />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction Section */}
      <div className="p-4 text-center bg-gray-800 rounded-lg mx-4 shadow-md mb-16">
        <h2 className="text-2xl font-bold mb-2">Stock Prediction</h2>
        {prediction !== null ? (
          <p className="text-3xl font-semibold text-green-400">
            Predicted Price: ${prediction}
          </p>
        ) : (
          <p className="text-gray-300">Fetching prediction...</p>
        )}
      </div>

      {/* News Ticker */}
      <div className="fixed bottom-0 w-full bg-red-700 py-2 overflow-hidden">
        <div
          ref={newsRef}
          className="whitespace-nowrap text-white text-lg font-semibold scrolling-news overflow-x-auto"
          style={{ display: "flex", gap: "2rem", padding: "0 1rem" }}
        >
          {news.length > 0 ? (
            news.map((headline, index) => (
              <span key={index} className="mx-8">{headline}</span>
            ))
          ) : (
            <span className="mx-8">No recent news available</span>
          )}
        </div>
      </div>

      {/* CSS for Scrolling Animation */}
      <style>
        {`
          .scrolling-news::-webkit-scrollbar {
            display: none;
          }
          .scrolling-news {
            -ms-overflow-style: none;
            scrollbar-width: none;
            white-space: nowrap;
            display: flex;
            animation: scrollNews 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default StockDetail;

