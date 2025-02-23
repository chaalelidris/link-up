import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Card - LinkUp",
  description: "Create a new card to share with your contacts.",
};

export default function NewCardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
