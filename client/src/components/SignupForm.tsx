import React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"

import { Link } from "react-router-dom";

import type { SignupFormData } from "../types/auth";
import type { User } from "@/types/user";

import { signup } from '../api/auth';
import axios, { type AxiosResponse } from "axios";

import {useDispatch} from "react-redux";
import {setLoggedIn} from "../features/user/authSlice";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";


function SignupForm(props: React.ComponentProps<"div">): React.JSX.Element {
  const { className, ...rest } = props;

  const dispatch: Dispatch<UnknownAction> = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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

    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    try {
      const response: AxiosResponse = await signup(formData);
      console.log(response)
      if (response.status === 201) {
        toast.success(response.data.message || "Signup successful!");
        const userData: User = response.data.payload;
        dispatch(setLoggedIn(userData))
        // navigate("/workspace");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          `Signup failed with status ${error.response?.status}` ||
          "An unknown error occurred";

        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...rest}>
      <Card className="backdrop-blur-2xl border border-white/30 shadow-xl text-white px-6 py-8 w-[90vw] max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold text-white">Welcome</CardTitle>
          <CardDescription className="text-sm text-white/80">
            Sign up with your Email and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    onChange={handleChange}
                  />
                </div>


                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    onChange={handleChange}
                  />
                </div>


                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Choose your password"
                      required
                      onChange={handleChange}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeClosed className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      required
                      onChange={handleChange}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-2 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeClosed className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>

              {/* Link to login */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupForm;
