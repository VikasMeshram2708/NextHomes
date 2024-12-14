"use client";

import { authLogin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useActionState } from "react";

export default function SignIn() {
  // interface state {
  //   error: string;
  //   message: string;
  // }
  const [state, loginAction, isPending] = useActionState(authLogin, null);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container grid lg:grid-cols-2 gap-8 px-4">
        {/* Logo Section */}
        <div className="flex flex-col items-center justify-center p-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-center text-2xl lg:text-4xl font-medium tracking-wide"
          >
            <span className="text-orange-500">Next</span>Homes.in
          </Link>

          {/* Descriptive Content */}
          <p className="text-center mt-4 text-sm lg:text-base">
            Discover your dream home with <strong>Next Homes.in</strong>.
            Explore the best real estate deals and exclusive offers, tailored
            just for you.
          </p>
        </div>

        {/* Login Card */}
        <Card className="max-w-md w-full border shadow-lg mx-auto">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            <CardDescription className="text-sm">
              Sign In and explore hot deals on properties.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={loginAction} className="space-y-4">
              <Input
                // type="email"
                name="email"
                placeholder="Email Address"
                className="w-full"
              />
              {state?.validationError?.emailValidationError && (
                <span className="text-red-500 font-bold text-sm">
                  * {state?.validationError?.emailValidationError}
                </span>
              )}
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full"
              />
              {state?.validationError?.passwordValidationError && (
                <span className="text-red-500 font-bold text-sm">
                  * {state?.validationError?.passwordValidationError}
                </span>
              )}
              <Button type="submit" className="w-full">
                {isPending ? "Processing..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <p className="text-center text-sm">
              Not an User
              <Link href="/auth/sign-up"> ? Sign Up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
