import type { Metadata } from "next";
import { Exo, Work_Sans } from "next/font/google";
import "./globals.css";

const exo = Exo({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "YINGLITECH - EV Charging Solutions",
  description:
    "Professional EV charging station manufacturer. Full-range products from 3.5KW portable to 720KW DC fast chargers. ODM & OEM for global markets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${exo.variable} ${workSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
