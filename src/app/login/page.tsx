"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/dashboard");
        }}
      >
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="text-green-600 hover:underline"
        >
          Register here
        </a>
      </p>
    </div>
  );
}
