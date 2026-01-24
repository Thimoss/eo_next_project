import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Owner Estimate",
  description: "Aplikasi Owner Estimate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className={montserrat.variable}>
        <head>
          <link rel="icon" href="/icon.png" sizes="any" />
        </head>

        <body className={`antialiased`}>
          <NextTopLoader showSpinner={false} color="#006eb6" />
          {children}
        </body>
      </html>
      <ToastContainer />
    </>
  );
}
