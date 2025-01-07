import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Founders List",
  description: "List of founders with their details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
