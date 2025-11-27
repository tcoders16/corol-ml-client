import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Predictor from "./pages/Predictor";
import HowItWorks from "./pages/HowItWorks";

export default function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#003366]">
          Corol ML Lab
        </h1>

        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-[#00916E] font-semibold">
            Predictor
          </Link>

          <Link to="/how-it-works" className="text-gray-700 hover:text-[#00916E] font-semibold">
            How It Works
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Predictor />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
}