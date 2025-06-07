import { Anton, Gothic_A1, Anonymous_Pro } from "next/font/google";

export const anton = Anton({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-anton",
});

export const gothic_a1 = Gothic_A1({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-gothic-a1",
});

export const anonymous_pro = Anonymous_Pro({
  weight: ["400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-anonymous-pro",
});
