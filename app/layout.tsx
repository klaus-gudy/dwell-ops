import type { Metadata } from "next";
import { montserrat } from './fonts/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Dwell Ops",
  description: "All-in-one solution for managing your rental properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
