import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import TopBar from "@/components/TopBar";
import GridBackground from "@/components/GridBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Timothy Teh",
  description: "Personal portfolio and blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <GridBackground />
        <TopBar />
        <div className="mx-auto max-w-[1440px]">
          {children}
        </div>
      </body>
    </html>
  );
}

