"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
// import { AuthProvider } from "./context/AuthContext";
import { AuthProvider } from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "ArrowDesk || ArrowNet",
  description: "ArrowDesk | Ticketing System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
