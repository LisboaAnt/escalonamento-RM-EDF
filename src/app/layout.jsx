import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Escalonamento da CPU - RM - DM",
  description: "CALCULADORA: – RM (Taxa Monotônica), EDF -(Earliest Deadline First)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
