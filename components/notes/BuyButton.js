"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
export default function BuyButton({
  noteId,
  price,
  title,
  text = "Buy Now",
  className = "",
}) {
  const router = useRouter();

  const handleBuy = async () => {
  try {
    const meRes = await fetch("/api/auth/me");
    const meData = await meRes.json();

    if (!meData.success) {
  toast.error("Please login to purchase notes.");

  const currentUrl =
    window.location.pathname + window.location.search;

  sessionStorage.setItem("scrollY", window.scrollY);
  sessionStorage.setItem("redirect", currentUrl);

  router.push(
    `/login?redirect=${encodeURIComponent(currentUrl)}`
  );

  return;
}
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
          noteId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Failed to create order.");
        return;
      }

      const options = {
        key: key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "GTR Classes",
        description: title,
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                noteId,
                amount: price,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment Successful!");

              router.push("/dashboard/purchased-notes");
              router.refresh();
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
  onClick={handleBuy}
  className={`w-full rounded-xl bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 ${className}`}
>
  {text}
</button>
    </>
  );
}
