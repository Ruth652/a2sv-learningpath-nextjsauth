"use client";

import SignupForm from "./SignUpForm";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="max-w-sm mx-auto py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-900">
        Sign Up Today!
      </h1>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        aria-label="Sign up with Google"
        className="w-full border border-gray-300 rounded-full py-3
                   flex items-center justify-center gap-3
                   text-gray-700 font-medium hover:shadow-md transition"
      >
        <FcGoogle className="w-5 h-5" />
        Sign Up with Google
      </button>

      <div className="flex items-center gap-2">
        <span className="flex-grow h-px bg-gray-300" />
        <span className="text-sm text-gray-500">Or Sign Up with Email</span>
        <span className="flex-grow h-px bg-gray-300" />
      </div>
      <SignupForm />

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#2D298E]">
          Login
        </Link>
      </p>

      <p className="mt-2 text-xs text-center text-gray-500">
        By clicking ‘Continue’, you acknowledge that you have read and accepted
        our{" "}
        <a href="/terms" className="underline  text-[#241f71]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline text-[#241f71]">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
