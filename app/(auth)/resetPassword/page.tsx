'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])/, {
      message: "Password must contain at least one number",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const { toast } = useToast()

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      // Here you would typically send a request to your authentication API
      console.log("password reset:", data)
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        description: "Password Reset successfully!",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your new password below</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            {...register("newPassword")}
            type="password"
            className={`${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`}
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            {...register("confirmPassword")}
            type="password"
            className={`${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Resetting password..." : "Reset password"}
        </Button>
      </form>
      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  )
}
