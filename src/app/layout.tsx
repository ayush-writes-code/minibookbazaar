import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Book Bazaar",
  description: "A premium, curated selection of new and hand-checked pre-loved books. Support local, read more.",
  openGraph: {
    title: 'Mini Book Bazaar',
    description: 'A premium, curated selection of new and hand-checked pre-loved books.',
    url: 'https://minibookbazaar.com', // Replace with real URL later
    siteName: 'Mini Book Bazaar',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Mini Book Bazaar - Curated Books',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
