import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import {Heading} from "@/lib/Heading";

export default function Hero() {
  const bannerUrl =
    "https://www.compass.com/ucfe-assets/homepage/homepage-v2.10.1/assets/hero_desktop1x_res.jpeg";

  return (
    <div className="relative w-full h-[36rem]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Background Image */}
      <Image
        src={bannerUrl}
        alt="banner"
        width={500}
        height={500}
        className="bg-cover w-full h-full"
      />

      {/* Search Bar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-lg w-full max-w-xl">
          <Heading cn="text-white text-center font-bold" text="Find Your Next Home" />
          <div className="bg-white rounded-lg shadow-lg p-4">
            <form className="relative">
              <Input
                type="text"
                placeholder="Search for properties, locations, or keywords"
              />
              <SearchIcon className="absolute top-2 right-2" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
