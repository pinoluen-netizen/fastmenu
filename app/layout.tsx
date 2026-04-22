import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastMenu",
  description: "Realtime restaurant order flow demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
