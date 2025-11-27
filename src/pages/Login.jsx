import { useState } from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    let data = {};
    try {
      data = await res.json();
    } catch {
      setLoading(false);
      return setError("Server unavailable. Please try again.");
    }

    if (!res.ok) {
      setLoading(false);
      return setError(data.detail);
    }

    // ---------------------------
    // MINIMAL: 2 sec loader → success
    // ---------------------------
    setTimeout(() => {
      setSuccess(true);

      // After animation, set token and allow redirect
      setTimeout(() => {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
      }, 1000);
    }, 2000);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-950">
      <div className="p-8 w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl">

        <h1 className="text-3xl mb-6 font-chakra text-white text-center">
          CementIQ Login
        </h1>

        {/* ------------------- Success Animation ------------------- */}
        {success ? (
          <div className="flex flex-col items-center gap-4 py-6 animate-fadeIn">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl">
              ✓
            </div>
            <p className="text-white text-lg font-semibold">
              Login Successful
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Username"
              className="p-3 rounded bg-neutral-800 text-white border border-neutral-700"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="p-3 rounded bg-neutral-800 text-white border border-neutral-700"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* ------------------- Loader OR Button ------------------- */}
            {!loading ? (
              <button
                className="p-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200"
                type="submit"
              >
                Login
              </button>
            ) : (
              <div className="flex justify-center py-3">
                <div className="w-8 h-8 border-4 border-gray-400 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}