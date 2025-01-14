"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      // Validasi sederhana, bisa diperluas
      router.push("/dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Login
        </button>
        <p className="text-center mt-4">
          Don`t have an account?{" "}
          <button
            onClick={handleRegisterRedirect}
            className="text-green-500 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
