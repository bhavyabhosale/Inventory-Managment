"use client";
import { loginSignup } from "@/actions/user";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useOptimistic } from "react";

const Signup = () => {
  const [loading, setLoading] = useOptimistic(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const res = await loginSignup(formData, false);
    if (res?.error) {
      toast({ title: res?.error });
    }
    setLoading(false);
  };
  return (
    <div className="grid place-content-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center gap-5 items-center py-10 w-[450px] shadow-lg rounded-lg bg-white">
        <h1 className="text-center font-bold text-4xl">Sign Up</h1>
        <form action={handleSubmit} className="w-full px-5">
          <FormInput
            name="name"
            type="text"
            placeholder="Enter your name"
            label="Full Name"
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Enter the email"
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Enter the password"
            label="Enter Password"
          />
          <Button
            type="submit"
            className={`${
              loading && "disabled cursor-not-allowed"
            } w-full bg-blue-500`}
          >
            {loading ? "loading..." : "Register"}
          </Button>
        </form>
        <Link
          href="/login"
          className="text-center text-blue-800 cursor-pointer underline"
        >
          Already have and account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
