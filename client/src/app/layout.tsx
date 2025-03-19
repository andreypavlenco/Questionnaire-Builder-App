"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/ui/header";
import { ReduxProvider } from "@/store/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark`}>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            <Header />
            {children}
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
