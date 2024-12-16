"use client";

import { newUser } from "@/actions/auth";
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
// import { redirect } from "next/navigation";
import React, { useActionState } from "react";

export default function SignUp() {
  const [state, action, isPending] = useActionState(newUser, null);
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

        {/* Separator */}
        {/* <div className="lg:hidden w-full h-[1px] bg-gray-300 my-6"></div> */}

        {/* Sign-Up Card */}
        <Card className="max-w-md w-full border shadow-lg mx-auto">
          {/* General Errors */}
          {state?.error && (
            <span className="text-red-500 text-sm font-medium">
              {state?.error}
            </span>
          )}
          {/* Success Response */}
          {state?.message && (
            <span className="text-cyan-500 text-sm font-medium">
              {state?.message}
            </span>
          )}
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">
              {isPending ? "Processing..." : "Sign Up"}
            </CardTitle>
            <CardDescription className="text-sm">
              Sign up and get exciting Real Estate Deals & Offers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={action} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="checkbox"
                  id="terms"
                  className="w-5 h-5 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link
                    href="/auth/terms"
                    className="text-orange-500 underline"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full">
                {isPending ? "Processing..." : "Sign Up"}
              </Button>
              {state?.validationErrors && (
                <>
                  <p className="text-red-500 text-sm font-medium">
                    {state.validationErrors.name}
                  </p>
                  <p className="text-red-500 text-sm font-medium">
                    {state.validationErrors.email}
                  </p>
                  <p className="text-red-500 text-sm font-medium">
                    {state.validationErrors.password}
                  </p>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <p className="text-center text-sm">
              Already an User
              <Link href="/auth/login"> ? Login</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
