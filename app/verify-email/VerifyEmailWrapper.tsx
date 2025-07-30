"use client";

import { useSearchParams } from "next/navigation";
import VerifyEmailForm from "./VerifyEmailForm";

export default function VerifyEmailWrapper() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="w-full max-w-md text-center px-6 py-10">
      <h1 className="text-2xl font-extrabold text-[#2D2D2D] mb-4">
        Verify Email
      </h1>
      <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
        We’ve sent a verification code to the email address you provided. To
        complete the verification process, please enter the code here.
      </p>
      <VerifyEmailForm email={email} />
    </div>
  );
}
