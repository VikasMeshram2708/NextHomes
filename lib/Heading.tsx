import React from "react";

type HeadingType = {
  cn?: string;
  text: string;
};
export function Heading({ cn, text }: HeadingType) {
  return (
    <h1
      className={`${cn} text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl p-2`}
    >
      {text}
    </h1>
  );
}

export function SubHeading({ cn, text }: HeadingType) {
  return (
    <h3
      className={`${cn} text-lg md:text-xl lg:text-2xl`}
    >
      {text}
    </h3>
  );
}


