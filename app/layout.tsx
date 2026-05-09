import type { Metadata, Viewport } from "next";
import TopBar from "@/components/TopBar";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Tinsights — Webdevelopment, Hosting & Security",
    template: "%s — Tinsights",
  },
  description:
    "Tinsights: professionele websites, webshops, hosting, SEO en ethical hacking voor mkb en zzp. Gevestigd in Groningen, actief door heel Nederland.",
  keywords: [
    "webdevelopment", "website laten maken", "webshop", "hosting",
    "SEO", "ethical hacking", "Groningen", "Next.js", "Nederland",
  ],
  metadataBase: new URL("https://tinsights.nl"),
  icons: {
    icon: [
      { url: "/assets/favicon.PNG?v=3", type: "image/png", sizes: "32x32" },
      { url: "/assets/favicon.PNG?v=3", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/assets/favicon.PNG?v=3", type: "image/png" }],
    shortcut: "/assets/favicon.PNG?v=3",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://tinsights.nl",
    siteName: "Tinsights",
    title: "Tinsights — Webdevelopment, Hosting & Security",
    description:
      "Professionele websites, webshops, hosting en ethical hacking voor mkb en zzp. Klein team, grote impact.",
    images: [{ url: "/assets/SETUP.jpg", width: 1200, height: 630, alt: "Tinsights developer setup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinsights — Webdevelopment, Hosting & Security",
    description: "Professionele websites en webshops voor mkb en zzp. Gevestigd in Groningen.",
    images: ["/assets/SETUP.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${plusJakarta.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.PNG?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.PNG?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.PNG?v=3" />
        <link rel="apple-touch-icon" href="/assets/favicon.PNG?v=3" />
        <link rel="shortcut icon" href="/assets/favicon.PNG?v=3" />
        <link rel="mask-icon" href="/assets/favicon.PNG" color="#6366f1" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className={`${plusJakarta.className} min-h-dvh bg-background text-foreground antialiased`}>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
