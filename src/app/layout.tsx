import type { Metadata } from "next";
import {
  DM_Sans,
  Geist,
  JetBrains_Mono,
  Noto_Serif_Display,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-display",
  weight: "variable",
  axes: ["wdth"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-ui",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlightFinder — Where can I fly?",
  description:
    "Find the cheapest flights from anywhere. Compare fares across providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", notoSerifDisplay.variable, dmSans.variable, jetBrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
