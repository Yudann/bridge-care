"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Username dan Password tidak boleh kosong!");
      return;
    }

    // Logika untuk login sebagai admin dengan case-insensitive
    if (
      username.toLowerCase() === "admin" &&
      password.toLowerCase() === "admin"
    ) {
      // Simpan username di cookies sebagai admin
      Cookies.set("username", username, { expires: 7 });
      alert("Login sebagai Admin");
      router.push("/admin"); // Arahkan ke halaman admin
    } else {
      // Logika untuk user biasa tanpa case-insensitive
      Cookies.set("username", username, { expires: 7 });
      alert("Login berhasil");
      router.push("/dashboard"); // Arahkan ke halaman user dashboard
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          Belum punya akun?
          <Link
            href="/register"
            className="text-green-500 ml-2 hover:underline"
          >
            Daftar Disini
          </Link>
        </p>
      </div>
    </div>
  );
}
