import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import StyledComponentsRegistry from "./components/StyledComponentsRegistry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phase Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          <div className="grid grid-flow-col grid-cols-[240px_auto_240px] bg-[#f2f2f2] h-screen pt-12">
            <SideNav />
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
