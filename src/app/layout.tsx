import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth Prajapati | Artist — Drawing Artist & Educator",
  description: "Immersive digital art exhibition of professional Drawing Artist, Educator, and Content Creator Parth Prajapati. Discover charcoal masterpieces, pencil sketches, ink art, drawing tutorials, and learning resources.",
  keywords: ["Parth Prajapati", "Artist", "Drawing Artist", "Art Educator", "Charcoal Portrait", "Hyperrealism", "Sketching Tutorials", "Fine Art Gallery"],
  authors: [{ name: "Parth Prajapati" }],
  openGraph: {
    title: "Parth Prajapati | Artist — Drawing Artist & Educator",
    description: "Immersive digital art exhibition of professional Drawing Artist, Educator, and Content Creator Parth Prajapati.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Prajapati | Artist — Drawing Artist & Educator",
    description: "Immersive digital art exhibition of professional Drawing Artist, Educator, and Content Creator Parth Prajapati.",
  },
  metadataBase: new URL("https://psartwork.vercel.app"),
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col selection:bg-gold-500 selection:text-black">
        <div className="paper-grain opacity-5" />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
