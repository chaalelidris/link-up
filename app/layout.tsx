import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"], // Choose subsets, like 'latin', 'latin-ext', etc.
  weight: ["300", "400", "700", "800", "900"], // Define font weights you plan to use.
});

export const metadata: Metadata = {
  title: "LinkUp",
  description:
    "Finies les cartes de visite papier, passez au numérique. Vous n'avez jamais de carte de visite mais vous avez toujours votre téléphone dans la poche !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <div className="absolute h-screen bg-home-backround-image w-full inset-0 -z-10 rotate-180 opacity-20" />{" "}
        {children}
      </body>
    </html>
  );
}
