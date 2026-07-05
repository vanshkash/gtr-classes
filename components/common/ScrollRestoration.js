"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");

    if (!scrollY) return;

    const timer = setTimeout(() => {
      window.scrollTo({
        top: Number(scrollY),
        behavior: "instant",
      });

      sessionStorage.removeItem("scrollY");
      sessionStorage.removeItem("redirect");
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}