import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sameeksha-weds-nishan.vercel.app"),
  title: "Sameeksha & Nishan · 26 November 2026",
  description:
    "Wedding invitation for Sameeksha R and Nishan R. Bangera — Thursday, 26th November 2026 at Khandiga Greens Multipurpose Hall, Beluvai.",
  openGraph: {
    title: "Sameeksha & Nishan Wedding Invitation",
    description:
      "Join us on Thursday, 26th November 2026 at Khandiga Greens Multipurpose Hall, Beluvai.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
