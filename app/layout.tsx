import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "../components/Providers.tsx";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} montserrat antialiased`}>
        <>
          <Providers>{children}</Providers>
        </>
        <Toaster />
      </body>
    </html>
  );
}
