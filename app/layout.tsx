import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { arsenal, sourceSans } from "./fonts";

export const metadata: Metadata = {
  title: "Grace and Grit - Rock Hill Spin Studio",
  description: "Spin cycling classes at Grace and Grit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${arsenal.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
