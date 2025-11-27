import { useState } from "react";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

async function handleLogin(e) {
  e.preventDefault();
  setError("");

  const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    return setError("Server unavailable. Please try again.");
  }

  if (!res.ok) return setError(data.detail);

  localStorage.setItem("authToken", data.token);
  setToken(data.token);
}

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-950">
      <div className="p-8 w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl">
        <h1 className="text-3xl mb-6 font-chakra text-white text-center">
          Corol-ML Login
        </h1>

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

          <button
            className="p-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}