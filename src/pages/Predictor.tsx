import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import MixInputForm, { MixForm, MixFields } from "../components/MixInputForm";
import PredictionResult from "../components/PredictionResults";

interface PredictorProps {
  token: string;
}

export default function Predictor({ token }: PredictorProps) {
  const [form, setForm] = useState<MixForm>({
    Cement: "",
    Slag: "",
    FlyAsh: "",
    Water: "",
    Superplasticizer: "",
    CoarseAggregate: "",
    FineAggregate: "",
    Age: "",
  });

  const [result, setResult] = useState<{
    predicted_strength: number;
    graph: string;
    confidence?: number;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* ---------------------- TOKEN VALIDATION ---------------------- */
  useEffect(() => {
    if (!token || token.trim().length < 5) {
      setErrorMsg("Unauthorized. Please log in first.");
    }
  }, [token]);

  if (!token || token.trim().length < 5) {
    return <Navigate to="/login" replace />;
  }

  /* ------------------ Update Field ------------------ */
  function updateField(field: MixFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* ------------------ Validate Inputs ------------------ */
  function validateForm(): boolean {
    const emptyFields = Object.entries(form).filter(([_, v]) => v.trim() === "");

    if (emptyFields.length > 0) {
      setErrorMsg("All fields must be filled before prediction.");
      return false;
    }

    return true;
  }

  /* ------------------ Prediction Handler ------------------ */
  async function handlePredict() {
    setLoading(true);
    setResult(null);
    setErrorMsg(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, Number(v)])
    );

    try {
      const response = await fetch(
        "https://corol-ml-api-1.onrender.com/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔥 secure
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 401) {
        setErrorMsg("Unauthorized request. Please login again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
      setErrorMsg("Prediction failed. Backend unreachable.");
    }

    setLoading(false);
  }

  return (
    <Layout
      title="Corol AI Lab — Strength Predictor"
      subtitle="Secure ML-driven strength prediction for internal R&D"
    >
      {/* Error Message */}
      {errorMsg && (
        <div
          className="
            mb-8 px-6 py-4 rounded-xl text-center font-chakra
            bg-red-100/60 border border-red-300 text-red-800
            animate-[fadeIn_0.5s_ease-out]
          "
        >
          {errorMsg}
        </div>
      )}

      {/* Input Form */}
      <MixInputForm
        form={form}
        updateField={updateField}
        onPredict={handlePredict}
        loading={loading}
      />

      {/* Prediction Result */}
      <PredictionResult result={result} />

      {/* Loading Overlay */}
      {loading && (
        <div
          className="
            fixed inset-0 flex justify-center items-center
            bg-white/50 backdrop-blur-xl z-50 
            animate-[fadeIn_0.3s_ease-out]
          "
        >
          <div className="text-center">
            <div className="loader mx-auto mb-6"></div>
            <p className="font-chakra text-lg text-[#006A5B]">
              Running AI model on mix proportions…
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}