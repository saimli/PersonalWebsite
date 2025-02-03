//import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./header";
import Footer from "./footer";

import { Raleway, IBM_Plex_Mono } from 'next/font/google';
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['400', '700']
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono'
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} ${raleway.variable} font-mono`}
      >
        <Navbar />
        <main className="flex-grow pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
