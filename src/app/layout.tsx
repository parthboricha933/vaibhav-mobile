import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Mobiles - Best Smartphone Deals in Rajula",
  description: "Explore the latest smartphones at unbeatable prices at Vaibhav Mobiles, Rajula. Browse, inquire, and find your perfect phone today!",
  keywords: ["Vaibhav Mobiles", "Rajula", "smartphones", "mobile store", "phone deals", "best phones"],
  authors: [{ name: "Vaibhav Mobiles" }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Vaibhav Mobiles - Best Smartphone Deals in Rajula",
    description: "Explore the latest smartphones at unbeatable prices",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
