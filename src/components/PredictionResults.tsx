import React from "react";
import SelectionHeader from "./SelectionHeader";

interface PredictionResultProps {
  result: {
    predicted_strength: number;
    graph: string; 
  } | null;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div
      className="
        relative mt-14 p-10 rounded-3xl
        bg-white/40 backdrop-blur-2xl border border-white/20 
        shadow-[0_12px_40px_rgba(0,0,0,0.15)]
        animate-[fadeIn_0.7s_ease-out]
      "
    >
      {/* Subtle gradient glow ring */}
      <div
        className="
          absolute inset-0 rounded-3xl pointer-events-none 
 from-[#00C29A]/20 to-[#006A5B]/20 
          blur-xl opacity-40 
        "
      ></div>

      <h2 className="text-3xl font-extrabold font-chakra text-[#0B2545] text-center relative z-10">
        Predicted Compressive Strength
      </h2>

      <div className="mt-6 text-center relative z-10">
        <p className="text-5xl font-extrabold font-chakra  from-[#006A5B] to-[#00C29A] text-transparent bg-clip-text drop-shadow-sm">
          {result.predicted_strength} MPa
        </p>

        <p className="text-[#0B2545]/70 font-chakra mt-1 tracking-wide">
          Based on input mix proportions
        </p>
      </div>
            <div className="text-center mb-10">



        <div className="mt-6 bg-[#F1F7F5] border border-[#00A37A] text-[#003B2B] rounded-xl py-5 px-6 inline-block shadow-sm">
          <p className="text-xl font-bold">
            {result.predicted_strength.toFixed(2)} MPa
          </p>
          <p className="text-sm text-gray-500 mt-1">Estimated compressive strength</p>
        </div>
      </div>

      {/* Graph Card */}
      <div
        className="
          mt-10 p-4 bg-white/70 backdrop-blur-xl rounded-2xl 
          border border-gray-200 shadow-lg 
          hover:shadow-2xl hover:scale-[1.01] 
          transition-all duration-300 relative z-10
        "
      >
        <img
          src={`data:image/png;base64,${result.graph}`}
          alt="Concrete Strength Prediction Graph"
          className="rounded-xl w-full object-contain"
        />
      </div>
      <SelectionHeader
            title="Mix Design Parameters"
            subtitle="Enter raw material quantities to estimate compressive strength"
            />
    </div>
  );
};

export default PredictionResult;