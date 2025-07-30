"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { verifyEmail } from "./actions";
import { useEffect, useState } from "react";

export default function VerifyEmailForm({ email }: { email: string }) {
  const [state, formAction] = useActionState(verifyEmail, undefined);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    if (!canResend) return;

    console.log("Resending code to", email);

    setTimeLeft(60);
    setCanResend(false);
  };

  return (
    <form
      action={formAction}
      className="flex flex-col items-center gap-6 w-full max-w-sm"
    >
      <input type="hidden" name="email" value={email} />

      <div className="flex flex-col items-center gap-1 w-full">
        <input
          name="OTP"
          placeholder="0  0  0  0"
          className={`text-center tracking-widest text-xl font-medium px-6 py-4 rounded-md w-full
            border outline-none transition
            ${
              state?.errors?.OTP
                ? "border-red-500 text-red-500"
                : "border-[#D4CEFA] text-[#D4CEFA]"
            }`}
        />
        {state?.errors?.OTP && (
          <p className="text-sm text-red-500">{state.errors.OTP}</p>
        )}
      </div>

      <div className="text-sm text-gray-600 text-center">
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-[#2D298E] font-semibold hover:underline"
          >
            Resend code
          </button>
        ) : (
          <>
            You can request to{" "}
            <span className="text-[#2D298E] font-semibold">Resend code</span> in{" "}
            <span className="text-[#2D298E] font-bold">
              {String(Math.floor(timeLeft / 60)).padStart(1, "0")}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#D4CEFA] text-white font-semibold py-3 rounded-full
                 disabled:opacity-50 transition"
    >
      {pending ? "Verifying..." : "Continue"}
    </button>
  );
}
