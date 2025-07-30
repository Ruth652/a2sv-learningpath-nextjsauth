"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup } from "./actions";

const SignUpForm = () => {
  const [state, formAction] = useActionState(signup, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border border-gray-300 rounded-md px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-[#2D298E]"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-sm">{state.errors.name}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          autoComplete="new-password"
          className="border border-gray-300 rounded-md px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-[#2D298E]"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
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
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-[#2D298E]"
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="confimrPassword"
          className="text-sm font-semibold text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded-md px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-[#2D298E]"
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-500 text-sm">{state.errors.confirmPassword}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#2D298E] hover:bg-[#241f71]
                 text-white font-semibold py-3 rounded-full
                 disabled:opacity-50 transition-colors"
    >
      {pending ? "Signing up..." : "Continue"}
    </button>
  );
}

export default SignUpForm;
