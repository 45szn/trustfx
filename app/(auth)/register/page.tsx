'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: 
    z.string()
    .min(8, { message: "Password must be at least 8 characters long" })    
    .regex(/^(?=.*[0-9])/, {
      message: "Password must contain at least one number",
    }),
  confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);

  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    try {
      // Here you would typically send a request to your authentication API
      console.log("Register data:", data);
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      toast({
        description: "Account registered successfully!",})
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setServerError("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information below to create your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} placeholder="John Doe" className={`${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} placeholder="m@example.com" type="email" className={`${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" {...register("password")} type="password" className={`${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" {...register("confirmPassword")} type="password" className={`${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-0 focus:border-gray-300`} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </div>
    </div>
  )
}

