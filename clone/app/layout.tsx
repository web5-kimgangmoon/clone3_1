import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { theme } from "./theme";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "Dribble.clone",
  description: "this is clonecoding page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`antialiased`}>
      {children}
    </html>
  );
}
