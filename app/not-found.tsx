"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Geen server-side redirect() hier: dat kan RSC/hydration problemen geven
 * en bij server-storingen onbedoeld ook op asset-requests van invloed zijn.
 */
export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontSize: 14,
        color: "#64748b",
      }}
    >
      Doorsturen naar de startpagina…
    </div>
  );
}
