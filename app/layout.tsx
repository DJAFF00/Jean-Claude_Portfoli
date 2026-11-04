import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat_Brush } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["400", "500", "600", "700", "800"] });
const brush = Caveat_Brush({ subsets: ["latin"], variable: "--font-brush", weight: "400" });

export const metadata: Metadata = {
  title: "Jean-Claude Houessou, développeur full stack",
  description: "Portfolio de Jean-Claude Houessou : applications web, gestion de stock, e-commerce et déploiement de serveurs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${brush.variable}`}>
      <body>{children}</body>
    </html>
  );
}
