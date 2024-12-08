"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Loader, Eye, EyeOff } from "lucide-react";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[0-9])/, {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;
      console.log("User registered:", user);

      // Update the user's profile with the display name
      await updateProfile(user, {
        displayName: data.name, // Correctly reference `data.name`
      });

      reset();
      toast({
        description: "Account registered successfully!",
      });
      router.push("/Dashboard");

      return user;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error.message);
      setServerError(error.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl text-gray-100 font-bold">Create an account</h1>
        <p className="text-gray-200 dark:text-gray-400">
          Enter your information below to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
        <div className="space-y-2">
          {/* <Label htmlFor="name">Name</Label> */}
          <Input
            id="name"
            {...register("name")}
            placeholder="John Doe"
            className={`${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-b border-b rounded-none text-white`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            id="email"
            {...register("email")}
            placeholder="m@example.com"
            type="email"
            className={`${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-b border-b rounded-none text-white`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="password">Password</Label> */}
          <div className="relative">
            <Input
              id="password"
              type={passwordVisible ? "password" : "true"}
              {...register("password")}
              placeholder="Enter your password"
              className={`${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-0 focus:border-b border-b rounded-none text-white`}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {passwordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          {/* <Label htmlFor="confirm-password">Confirm Password</Label> */}
          <div className="relative">
            <Input
              id="confirm-password"
              {...register("confirmPassword")}
              placeholder="Confirm your password"
              type={passwordVisible ? "password" : "true"}
              className={`${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-0 focus:border-b border-b rounded-none text-white`}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {passwordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full mt-10 bg-gray-100 text-[#161616] hover:bg-[#b0b0b0]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-100">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
