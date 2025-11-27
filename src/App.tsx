import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Predictor from "./pages/Predictor";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

export default function App() {
  const [token, setToken] = useState("");

  // Load token from localStorage on refresh
  useEffect(() => {
    const saved = localStorage.getItem("authToken");
    if (saved) setToken(saved);
  }, []);

  // Logout
  function handleLogout() {
    localStorage.removeItem("authToken");
    setToken("");
  }

  const isLoggedIn = Boolean(token);

  return (
    <Router>
      {/* Show navbar ONLY when logged in */}
      {isLoggedIn && (
        <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#003366]">
            Corol ML Lab
          </h1>

          <div className="space-x-6 flex items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-[#00916E] font-semibold"
            >
              Predictor
            </Link>

            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-[#00916E] font-semibold"
            >
              How It Works
            </Link>

            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
            >
              Logout
            </button>
          </div>
        </nav>
      )}

      <Routes>
        {/* LOGIN ROUTE */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Predictor token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/how-it-works"
          element={
            isLoggedIn ? (
              <HowItWorks token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* CATCH-ALL — redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}