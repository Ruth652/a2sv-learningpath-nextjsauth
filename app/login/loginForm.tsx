"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./action";
import Link from "next/link";

const LoginForm = () => {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <form
      action={loginAction}
      className="flex flex-col gap-5 w-full max-w-md mx-auto mt-20 p-8 rounded-lg"
    >
      <h1 className="text-2xl font-extrabold text-center text-gray-900">
        Welcome Back,
      </h1>
      <div className="flex items-center">
        <span className="flex-grow h-px bg-gray-300" />
        <span className="px-12" />{" "}
        <span className="flex-grow h-px bg-gray-300" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          placeholder="Enter email address"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>

      <SubmitButton />

      <p className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-[#2D298E] font-semibold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-[#2D298E] hover:bg-indigo-900 text-white font-semibold py-3 rounded-full transition-colors duration-200"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default LoginForm;
