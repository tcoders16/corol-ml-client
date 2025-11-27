import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MixInputForm, { MixForm, MixFields } from "../components/MixInputForm";
import PredictionResult from "../components/PredictionResults";
import { useNavigate } from "react-router-dom";

interface PredictorProps {
  token: string;   // <-- we accept the token from App.tsx
}

export default function Predictor({ token }: PredictorProps) {
  const navigate = useNavigate();

  const VALID_TOKEN = "corol-secure-991166";  // you will generate it on login

  /* Security: Redirect if token invalid */
  useEffect(() => {
    if (!token || token !== VALID_TOKEN) {
      navigate("/login");  // force user to login
    }
  }, [token]);

  // ------------------ Form State ------------------
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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function updateField(field: MixFields, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm(): boolean {
    const empty = Object.values(form).some((v) => v.trim() === "");
    if (empty) {
      setErrorMsg("All fields must be filled before predicting.");
      return false;
    }
    return true;
  }

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // <-- secure header
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMsg(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setErrorMsg("Backend connection failed.");
    }

    setLoading(false);
  }

  return (
    <Layout
      title="Corol AI Lab — Strength Predictor"
      subtitle="Authorized Access Only — Secure ML Engine"
    >
      {errorMsg && (
        <div className="mb-6 px-6 py-4 rounded-xl bg-red-100 border border-red-300 text-red-800 font-chakra">
          {errorMsg}
        </div>
      )}

      <MixInputForm
        form={form}
        updateField={updateField}
        onPredict={handlePredict}
        loading={loading}
      />

      <PredictionResult result={result} />
    </Layout>
  );
}