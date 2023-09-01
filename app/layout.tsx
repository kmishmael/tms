import "./globals.css";
import type { Metadata } from "next";
import { Inter  } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IT Support Desk - Sentinel Africa Consulting",
  description: "IT Support Desk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={''}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
