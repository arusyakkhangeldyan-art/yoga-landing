import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yoga with Arika | Mindful movement in the city",
  description:
    "Premium yoga studio offering Hatha, Vinyasa, and Yin classes in a calm, minimalist space.",
  openGraph: {
    title: "Yoga with Arika",
    description:
      "Grounding classes, expert teachers, and an intentionally calm atmosphere.",
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
      className={`${body.variable} ${display.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
