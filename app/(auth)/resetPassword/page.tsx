"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/firebase";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[0-9])/, {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setServerError(null);
    try {
      if (!oobCode) {
        throw new Error("Invalid or missing reset code.");
      }

      if (!auth) {
        throw new Error(
          "Auth is not initialized. Ensure this is running on the client.",
        );
      }

      // Confirm the password reset
      await confirmPasswordReset(auth, oobCode, data.newPassword);
      reset();
      toast({
        description: "Password reset successfully!",
      });
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("reset error:", error.message);
      setServerError(error.message || "An error occurred while resetting.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl text-gray-100 font-bold">Reset Password</h1>
        <p className="text-gray-200 dark:text-gray-400">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-10">
        <div className="space-y-2">
          {/* <Label htmlFor="new-password">New Password</Label> */}
          <div className="relative">
            <Input
              id="new-password"
              placeholder="Password"
              type={passwordVisible ? "password" : "text"}
              {...register("newPassword")}
              className={`${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-0 focus:border-b border-b rounded-none text-white`}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {passwordVisible ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="confirm-password">Confirm New Password</Label> */}
          <div className="relative">
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              type={passwordVisible ? "password" : "text"}
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
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
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
          className="w-full mt-16 bg-gray-100 text-[#161616] hover:bg-[#b0b0b0]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-100">
        Remember your password?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
