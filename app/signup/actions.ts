"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

type SignupErrors = {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };

const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

  export async function signup(
    prevState: any,
    formData: FormData
  ): Promise<{ errors?: SignupErrors } | undefined> {
  const result = signupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, confirmPassword} = result.data;

  try {
    const res = await fetch("https://akil-backend.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
        role:'user',
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        errors: {
          email: [data?.message || "Signup failed"],
        },
      };
    }
  } catch (error) {
    console.error("Signup error:", error);
    return {
      errors: {
        email: ["Something went wrong. Please try again."],
      },
    };
  }


  redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}