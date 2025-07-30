"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from 'next/navigation';

type LoginErrors = {
    email?: string[];
    password?: string[];
  };

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData):Promise<{ errors?: LoginErrors }> {
    const result = loginSchema.safeParse(Object.fromEntries(formData))

    if(!result.success){
        return{
            errors:result.error.flatten().fieldErrors,
        }
    }
    const{email, password} = result.data;

    try {
        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          return {
            errors: {
              email: [data?.message || "Invalid email or password"],
            },
          };
        }

    await createSession(email); // 👈 Store email instead of user ID
    

  } catch (error) {
    console.error("Login failed:", error);
    return {
      errors: {
        email: ["Something went wrong. Please try again."],
      },
    };
  }
redirect("/dashboard");
}
export async function logout() {

    await deleteSession();
    redirect("/login");
}