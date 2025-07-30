"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

const verifyEmailSchema = z.object({
    OTP: z.string().min(4, { message: "OTP must be at least 4 characters" }),
  email: z.string(),
});

export async function verifyEmail(prevState: any, formData: FormData) {
  const result = verifyEmailSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, OTP } = result.data;

  try {
    const res = await fetch("https://akil-backend.onrender.com/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, OTP }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        errors: {
            OTP: [data?.message || "Verification failed"],
        },
      };
    }

    
  } catch (error) {
    console.error("Verification failed:", error);
    return {
      errors: {
        OTP: ["Something went wrong. Please try again."],
      },
    };
  }
  redirect("/login");
}
