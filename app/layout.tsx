import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "../components/LightRays"
import Navbar from "@/components/Navbar";

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const MartianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "A tech hub for all dev event you won't miss",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${SchibstedGrotesk.variable} ${MartianMono.variable} min-h-screen antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.1}
            rayLength={1.4}
            followMouse
            mouseInfluence={0.02}
            noiseAmount={0.0}
            distortion={0.01}
          />
        </div>
        <main>
          {children}
        </main>
        
    </body>
    </html>
  );
}
