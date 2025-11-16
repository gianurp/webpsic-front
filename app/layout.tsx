import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creciendo Juntos - Consultorio Virtual de Psicología | Diana Campos Del Carpio",
  description: "Consultorio virtual de psicología con Diana Campos Del Carpio. Terapia online profesional para tu bienestar emocional y mental. Creciendo juntos hacia una vida más plena.",
  keywords: "psicología, terapia online, consultorio virtual, bienestar emocional, Diana Campos Del Carpio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
