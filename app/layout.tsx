import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Chatbot application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} flex flex-row h-full w-full justify-center dark:bg-[#1f2226] md:py-5`}
      >
        <div className="w-full md:w-4/5">{children}</div>
      </body>
    </html>
  );
}
