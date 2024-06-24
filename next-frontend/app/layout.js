import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ArrowDesk || ArrowNet",
  description: "ArrowDesk | Ticketing System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
