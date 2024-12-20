"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Loader, Eye, EyeOff } from "lucide-react";

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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
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
      // Log in user in Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log("User logged in:", userCredential.user);

      reset();
      toast({
        description: "Logged in successfully!",
      });
      router.push("/Dashboard");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error.message);
      setServerError(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl text-gray-100 font-bold">Login</h1>
        <p className="text-gray-200 dark:text-gray-400">
          Enter your details below to login to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="!mt-10">
        <div className="space-y-2">
          {/* <Label htmlFor="email">Email</Label> */}
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
            className={`${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-b border-b rounded-none text-white`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          {/* <Label htmlFor="password">Password</Label> */}
          <div className="relative mt-12">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
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
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full mt-10 bg-gray-100 text-[#161616] hover:bg-[#b0b0b0]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link className="underline text-gray-100" href="/forgotPassword">
          Forgot password?
        </Link>
      </div>

      <div className="text-center text-sm text-gray-100">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
