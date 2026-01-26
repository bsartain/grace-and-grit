import localFont from "next/font/local";

export const arsenal = localFont({
  src: [
    {
      path: "../public/fonts/Arsenal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Arsenal-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arsenal",
  display: "swap",
});

export const sourceSans = localFont({
  src: [
    {
      path: "../public/fonts/SourceSans3-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceSans3-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SourceSans3-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
});
