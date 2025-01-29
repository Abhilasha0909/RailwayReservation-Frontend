import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminHeader from "@/components/layout/AdminHeader"; // Import AdminHeader
import { usePathname } from "next/navigation"; // Import usePathname


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Japan Railways - Book Your Journey",
  description: "Modern railway reservation system for Japan Railways",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}