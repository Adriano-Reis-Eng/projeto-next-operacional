import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Operacional | Sistema Web Next.js de teste ",
  description: "Sistema Operacional Next.js de teste desenvolvido por Adriano Reis, Engenheiro de software.",
  keywords: ["Next.js", "Adriano Reis", "Sistema Operacional Web", "Protótipo", "Engenharia de Software"],
  authors: [{ name: "Adriano Reis" }],
  creator: "Adriano Reis",
  robots: "index, follow",
  openGraph: {
    title: "Operacional | Sistema Web de Teste",
    description: "Sistema operacional moderno desenvolvido com Next.js por Adriano Reis.",
    url: "https://seusite.com", // Substitua pelo URL real
    siteName: "Operacional",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Operacional | Sistema Web de Teste",
    description: "Sistema operacional moderno desenvolvido com Next.js por Adriano Reis.",
    creator: "@SeuTwitter", // Opcional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
