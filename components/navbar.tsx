import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const links = [
    {
      title: "Buy",
      href: "/p/buy",
    },
    {
      title: "Rent",
      href: "/p/rent",
    },
    {
      title: "Sell",
      href: "/p/sell",
    },
    {
      title: "Agents",
      href: "/p/agents",
    },
    {
      title: "Explore",
      href: "/p/explore",
    },
    {
      title: "News",
      href: "/p/news",
    },
  ];
  return (
    <header className="border-b shadow p-3">
      <nav className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-medium"
        >
          <span className="text-orange-500">Next</span>
          Homes.in
        </Link>
        <ul className="flex items-center gap-2 text-sm">
          {links &&
            links?.map((link) => (
              <Link key={link.href} href={link.href} className="capitalize">
                <li className="hover:bg-orange-500 font-medium p-2 rounded hover:text-white">{link.title}</li>
              </Link>
            ))}
        </ul>
        <div className="space-x-3">
          <Button>Login</Button>
          <Button className="shadow" variant={"outline"}>
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}
