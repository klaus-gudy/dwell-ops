import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";

export const metadata: Metadata = {
  title: "Dwell Ops",
  description: "All-in-one solution for managing your rental properties",
};

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', weight: ['400','700'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
