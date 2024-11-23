"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])/, {
      message: "Password must contain at least one number",
    }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [serverError, setServerError] = useState<string | null>(null);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      // Here you would typically send a request to your authentication API
      console.log("Login data:", data);
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      toast({
        description: "Login successfully!",})
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setServerError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className={`${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link className="underline" href="/forgot-password">
          Forgot password?
        </Link>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
