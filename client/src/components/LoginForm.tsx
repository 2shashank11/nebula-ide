import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Eye, EyeClosed } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link } from "react-router-dom"
import { login } from '../api/auth';
import axios, { type AxiosResponse } from "axios"
import type { LoginFormData } from "@/types/auth"
import type { User } from "@/types/user"

import {useDispatch} from "react-redux";
import {setLoggedIn} from "../features/user/authSlice";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse = await login(formData);
      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        const userData: User = response.data.payload;
        dispatch(setLoggedIn(userData));
        // navigate("/dashboard");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          `Login failed with status ${error.response?.status}` ||
          "An unknown error occurred";

        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="backdrop-blur-2xl border border-white/30 shadow-xl text-white px-6 py-8 w-[90vw] max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
          <CardDescription className="text-sm text-white/80">
            Login with your Email and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    onChange={handleChange}
                    className="bg-white/20 text-white placeholder-white/70"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      onChange={handleChange}
                      className="pr-10 bg-white/20 text-white placeholder-white/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center justify-center text-white/60 hover:text-white"
                      tabIndex={-1}
                    >
                      {showPassword ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary text-white">
                  Log in
                </Button>
              </div>
              <div className="text-center text-sm text-white/70">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4 text-white">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
