import type { Metadata, Viewport } from "next";
import "./scss/globals.scss";
import { anton, gothic_a1, anonymous_pro } from "./fonts";
import seoKeywords from "@/utils/keywords";
import ReactLenis from "lenis/react";
import "lenis/dist/lenis.css";
import Header from "@/components/header/Header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: "Cycle Safari | Unforgettable Cycling Holidays in Central India",
  description:
    "Embark on unforgettable cycling holidays with Cycle Safari in Central India. Experience overnight camping and multi-day adventures through the scenic landscapes of Satpura hills and Pench National Park. Explore the rich biodiversity and cultural heritage with expert-guided tours.",
  keywords: seoKeywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${anton.variable} ${gothic_a1.variable} ${anonymous_pro.variable}`}
        >
          <Header />
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
