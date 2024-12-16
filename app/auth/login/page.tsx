"use client";

// import { loginUser } from "@/actions/auth";
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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
// import { redirect } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const pathName = usePathname();

  const onLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });
      if (res?.ok && res.status === 200) {
        alert("Logged In");
      } else {
        alert(res?.error);
      }
    },
    [user]
  );

  useEffect(() => {
    if (pathName !== "/auth/login") {
      redirect("/");
    }
  }, [pathName]);

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
            <form onSubmit={onLogin} className="space-y-4">
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                placeholder="Email Address"
                className="w-full"
              />

              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
                placeholder="Password"
                className="w-full"
              />

              <Button type="submit" className="w-full">
                Login
                {/* {isPending ? "Processing..." : "Login"} */}
              </Button>
              {/* {state?.validationErrors && (
                <>
                  <p className="text-red-500 text-sm font-medium">
                    {state.validationErrors.email}
                  </p>
                  <p className="text-red-500 text-sm font-medium">
                    {state.validationErrors.password}
                  </p>
                </>
              )} */}
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
