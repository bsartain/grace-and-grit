import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Arsenal, Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rockhillspinstudio.com"),

  title: "Grace & Grit Spin Studio",
  description: "High-energy spin cycling classes at Grace & Grit in Rock Hill.",

  openGraph: {
    type: "website",
    url: "https://rockhillspinstudio.com",
    title: "Grace & Grit Spin Studio",
    description: "High-energy spin cycling classes at Grace & Grit in Rock Hill.",
    siteName: "Grace & Grit",
    images: [
      {
        url: "/og-facebook.jpg",
        width: 1200,
        height: 630,
        alt: "Grace & Grit Spin Studio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>{children}</body>
    </html>
  );
}
