import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Instrument_Serif({ subsets: ["latin"], variable: "--font-display", weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Jean-Claude Houessou, développeur full stack",
  description: "Portfolio de Jean-Claude Houessou : applications web, gestion de stock, e-commerce et déploiement de serveurs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
