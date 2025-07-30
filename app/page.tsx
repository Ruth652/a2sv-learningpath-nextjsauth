"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>

      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-[#2D298E] text-white px-6 py-3 rounded hover:bg-blue-800 transition"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 transition"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
