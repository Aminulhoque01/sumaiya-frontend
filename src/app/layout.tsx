import type { Metadata } from "next";
import { Inter } from "next/font/google";

 

import "./globals.css";
import ThemeProvider from "../components/providers/ThemeProvider";
import ReduxProvider from "../redux/provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sumaiya Haque — Graphic Designer",
  description:
    "Sumaiya Haque is a graphic designer creating distinctive visual identities, digital experiences and meaningful brand stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body>
        <ThemeProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}