import { Rye, Noto_Sans } from "next/font/google";

export const rye = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rye",
});

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
