//import type { Metadata } from "next";
//import localFont from "next/font/local";
"use client";
import "./globals.css";
import Navbar from "./header";
import Footer from "./footer";

import { Raleway, IBM_Plex_Mono } from 'next/font/google';
import { useEffect } from "react";
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


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  useEffect(() => {
    // Ensure the modal root exists in the DOM
    let modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.id = "modal-root";
      document.body.appendChild(modalRoot);
    }
  }, []);


  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} ${raleway.variable} font-mono`}>
        <Navbar />
        <main className="flex-grow pt-10">
          {children}
        </main>
        <Footer />
        {/* This is where the modal will be mounted */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
