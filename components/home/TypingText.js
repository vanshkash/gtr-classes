"use client";

import { TypeAnimation } from "react-type-animation";

export default function TypingText() {
  return (
    <TypeAnimation
      sequence={[
        "Our Mission",
        2000,
        "Our Passion",
        2000,
        "Our Commitment",
        2000,
        "Our Promise",
        2000,
      ]}
      speed={50}
      repeat={Infinity}
    />
  );
}