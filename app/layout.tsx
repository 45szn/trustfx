import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from '@/components/ui/sonner';
import Providers from "../components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TrustFx",
  description:
    "At TrustFx, we're not just managing investments — we're building a community of empowered investors who have the tools, knowledge, and support they need to achieve financial independence.",
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
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
