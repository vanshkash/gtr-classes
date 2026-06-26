"use client";
import { useState } from "react";

const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
export default function BuyButton({ noteId, price, title }) {
  const [verified, setVerified] = useState(false);
  const [downloadToken, setDownloadToken] = useState("");

  const handleBuy = async () => {
    try {
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
        alert("Failed to create order.");
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
              setVerified(true);
              setDownloadToken(verifyData.downloadToken);
            } else {
              alert("Payment Verification Failed");
            }
          } catch (error) {
            console.error(error);
            alert("Something went wrong.");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    window.location.href = `/api/notes/download/${noteId}?token=${downloadToken}`;
  };

  return (
    <>
      {!verified ? (
        <button
          onClick={handleBuy}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Buy Now
        </button>
      ) : (
        <button
          onClick={handleDownload}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Download Notes
        </button>
      )}
    </>
  );
}
