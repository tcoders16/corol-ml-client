import React from "react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center py-14 px-6 font-chakra">

      {/* ---------------- TOP HEADER CARD ---------------- */}
      <div className="bg-white border-l-4 border-[#00916E] p-10 rounded-2xl shadow-lg mb-12 w-full max-w-5xl
        animate-[fadeIn_0.5s_ease-out]">
        
        <h1 className="text-4xl font-extrabold text-[#0A1F33] tracking-tight leading-snug">
          How the Prediction Works — Scientific & Mathematical Overview
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          A clear breakdown of the engineering, material-science, and machine-learning
          principles powering Corol’s concrete compressive-strength prediction engine.
        </p>
      </div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-5xl border
        text-gray-800 space-y-12 leading-relaxed animate-[fadeIn_0.7s_ease-out]">

        {/* SECTION TEMPLATE USED BELOW */}
        {/** 
          Every <section> now uses a consistent style:
          - A clean title
          - Good spacing
          - Better readability
         */}

        {/* ---------------- SECTION 1 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">1. Objective of the Prediction System</h2>

          <p>The ML model predicts a single, core property:</p>

          <p className="font-semibold text-2xl mt-3 text-[#003366]">
            Concrete Compressive Strength (MPa)
          </p>

          <p className="mt-4">
            This prediction is based on standardized concrete mix design parameters.
            Our model is trained using the globally recognized concrete dataset:
          </p>

          <p className="italic text-sm mt-3 text-gray-500">
            Yeh, I-Cheng. (1998). Modeling of strength of high-performance concrete using artificial neural networks.
          </p>
        </section>

        {/* ---------------- SECTION 2 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">2. Input Variables (Feature Vector X)</h2>

          <p>
            Each concrete sample is represented as a vector containing key material quantities:
          </p>

          <pre className="code-block bg-gray-100 p-4 rounded-lg overflow-auto text-sm mt-4">
X = [
  Cement,
  Slag,
  FlyAsh,
  Water,
  Superplasticizer,
  CoarseAggregate,
  FineAggregate,
  Age
]
          </pre>

          <p className="mt-4">
            These features influence hydration rate, porosity, microstructure formation, and
            long-term strength development.
          </p>
        </section>

        {/* ---------------- SECTION 3 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">3. Mathematical Model — Linear Regression</h2>

          <p>The predictor uses a multi-variable linear regression relationship:</p>

          <pre className="code-block bg-gray-100 p-4 rounded-lg overflow-auto text-sm mt-4">
Predicted_Strength =
    β₀
  + β₁·Cement
  + β₂·Slag
  + β₃·FlyAsh
  + β₄·Water
  + β₅·Superplasticizer
  + β₆·CoarseAggregate
  + β₇·FineAggregate
  + β₈·Age
          </pre>

          <p className="mt-4">
            Each coefficient <strong>βᵢ</strong> represents how sensitive compressive strength is to
            a specific ingredient.
          </p>
        </section>

        {/* ---------------- SECTION 4 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">
            4. How the Coefficients Are Learned (Ordinary Least Squares)
          </h2>

          <p>The regression algorithm computes β-values by minimizing:</p>

          <pre className="code-block bg-gray-100 p-4 rounded-lg overflow-auto text-sm mt-4">
Loss = Σ (Actualᵢ − Predictedᵢ)²
          </pre>

          <p className="mt-4">
            This is the classical <strong>Ordinary Least Squares (OLS)</strong> optimization technique.
          </p>

          <p className="italic text-sm mt-2 text-gray-500">
            Reference: Draper & Smith — Applied Regression Analysis.
          </p>
        </section>

        {/* ---------------- SECTION 5 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">5. Model Training Process</h2>

          <ol className="list-decimal ml-6 space-y-3 text-gray-700">
            <li>Load dataset of 1,030 real concrete samples.</li>
            <li>Normalize and clean the numerical fields.</li>
            <li>Split into <strong>80% training</strong> and <strong>20% testing</strong>.</li>
            <li>Fit the regression model to determine β-coefficients.</li>
            <li>Evaluate accuracy on unseen test samples.</li>
          </ol>
        </section>

        {/* ---------------- SECTION 6 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">6. How a New Mix Is Predicted</h2>

          <p>When a new concrete mix is submitted:</p>

          <ol className="list-decimal ml-6 space-y-2 mt-3">
            <li>The input values are validated.</li>
            <li>The system converts the data to feature vector <code>X</code>.</li>
            <li>The regression formula computes the estimated MPa value.</li>
            <li>The backend returns:
              <ul className="list-disc ml-6 mt-1">
                <li>Predicted compressive strength</li>
                <li>A scatter-plot visualization</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* ---------------- SECTION 7 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">7. Understanding the Generated Graph</h2>

          <p>The graph includes:</p>

          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li><span className="font-bold text-blue-600">Blue dots</span> — Actual Data Points</li>
            <li><span className="font-bold text-red-600">Red line</span> — prediction line ( y = mx + c )</li>
            <li><span className="font-bold text-yellow-600">Yellow dot</span> — your prediction on the new data entered </li>
          </ul>

          <p className="mt-4">
            If the yellow dot lies near the red diagonal line, the model prediction
            is within strong confidence.
          </p>
        </section>

        {/* ---------------- SECTION 8 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">8. Scientific Factors Affecting Accuracy</h2>

          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li>Curing age increases strength exponentially.</li>
            <li>Water-to-cement ratio is the most critical factor for porosity.</li>
            <li>SCMs like slag & fly ash improve long-term microstructure.</li>
          </ul>

          <p className="italic text-sm text-gray-500 mt-2">
            Reference: Aïtcin — High-Performance Concrete; Neville — Properties of Concrete.
          </p>
        </section>

        {/* ---------------- SECTION 9 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">9. Limitations</h2>

          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li>Linear regression cannot model nonlinear hydration behavior.</li>
            <li>Extreme mix designs reduce prediction reliability.</li>
            <li>Temperature, aggregate texture, and humidity are not included yet.</li>
          </ul>

          <p className="italic text-sm text-gray-500 mt-2">
            Future improvements may use Random Forests or Neural Networks.
          </p>
        </section>

        {/* ---------------- SECTION 10 ---------------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#00916E] mb-2">10. Summary</h2>

          <p>
            Corol’s prediction engine blends <strong>material-science principles</strong> with
            <strong> classical regression techniques</strong> to provide rapid,
            explainable estimates that support mix optimization and R&D workflows.
          </p>

          <p className="mt-4 font-semibold text-[#003366]">
            It is an analytical decision-support tool —  
            not a replacement for certified laboratory testing.
          </p>
        </section>

      </div>
    </div>
  );
}