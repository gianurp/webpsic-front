import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ScrollHandler from "./components/ScrollHandler";
import FloatingButtons from "./components/FloatingButtons";
import CalmWaves from "./components/CalmWaves";
import CalmBackdrop from "./components/CalmBackdrop";
import RouteTransition from "./components/RouteTransition";

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
        <Header />
        <ScrollHandler />
        <CalmBackdrop />
        <main className="pt-20 relative z-10">
          <RouteTransition>
            {children}
          </RouteTransition>
        </main>
        <CalmWaves />
        <FloatingButtons />
      </body>
    </html>
  );
}
