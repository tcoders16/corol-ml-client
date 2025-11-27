import React from "react";

export type MixFields =
  | "Cement"
  | "Slag"
  | "FlyAsh"
  | "Water"
  | "Superplasticizer"
  | "CoarseAggregate"
  | "FineAggregate"
  | "Age";

export type MixForm = Record<MixFields, string>;

interface MixInputFormProps {
  form: MixForm;
  updateField: (field: MixFields, value: string) => void;
  onPredict: () => void;
  loading: boolean;
}

const labels: Record<MixFields, string> = {
  Cement: "Cement (kg/m³)",
  Slag: "Blast Furnace Slag (kg/m³)",
  FlyAsh: "Fly Ash (kg/m³)",
  Water: "Water (kg/m³)",
  Superplasticizer: "Superplasticizer (kg/m³)",
  CoarseAggregate: "Coarse Aggregate (kg/m³)",
  FineAggregate: "Fine Aggregate (kg/m³)",
  Age: "Curing Age (Days)",
};

const MixInputForm: React.FC<MixInputFormProps> = ({
  form,
  updateField,
  onPredict,
  loading,
}) => {
  return (
    <div className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 
      animate-[fadeIn_0.6s_ease-out]">

      <h2 className="text-3xl font-extrabold font-chakra text-[#0B2545] mb-6 tracking-tight">
        Concrete Mix Design
      </h2>

      <p className="text-[#006A5B] mb-8 font-medium font-chakra">
        Enter the raw material quantities below.
      </p>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {(Object.keys(form) as MixFields[]).map((k) => (
          <div key={k} className="flex flex-col group">
            <label className="text-[#0B2545] font-semibold font-chakra mb-2 group-hover:translate-x-1 transition">
              {labels[k]}
            </label>

            <input
              type="number"
              value={form[k]}
              onChange={(e) => updateField(k, e.target.value)}
              placeholder={labels[k]}
              className="
                p-4 rounded-xl border border-gray-300 bg-white/70 font-chakra 
                shadow-inner focus:ring-2 focus:ring-[#00C29A] focus:outline-none
                transition-all duration-200 
                hover:shadow-xl hover:border-[#00C29A] hover:scale-[1.02]
              "
            />
          </div>
        ))}
      </div>

      {/* Predict Button */}
      <button
        onClick={onPredict}
        disabled={loading}
        className="
          mt-10 w-full py-4 text-white font-semibold font-chakra text-xl 
          rounded-xl shadow-xl transition-all duration-300
          bg-green-700
          hover:opacity-90 hover:shadow-2xl hover:scale-[1.01]
          disabled:opacity-50 disabled:hover:scale-100
        "
      >
        {loading ? "Analyzing Mix Composition…" : "Predict Strength"}
      </button>
    </div>
  );
};

export default MixInputForm;