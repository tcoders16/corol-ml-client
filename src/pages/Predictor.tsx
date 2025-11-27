import React, { useState } from "react";
import Layout from "../components/Layout";
import MixInputForm, { MixForm, MixFields } from "../components/MixInputForm";
import PredictionResult from "../components/PredictionResults";

export default function Predictor() {
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
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  /* ------------------ Update Field ------------------ */
  function updateField(field: MixFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  /* ------------------ Validate Inputs ------------------ */
  function validateForm(): boolean {
    const emptyFields = Object.entries(form).filter(([_, v]) => v.trim() === "");

    if (emptyFields.length > 0) {
      setErrorMsg("All material fields must be filled before predicting.");
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
      const response = await fetch("https://corol-ml-api-1.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
      setErrorMsg("Prediction failed. Please check the backend connection.");
    }

    setLoading(false);
  }

  return (
    <Layout
      title="Corol AI Lab — Strength Predictor"
      subtitle="ML-driven prediction engine for sustainable concrete design"
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