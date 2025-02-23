import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Clients - LinkUp",
  description: "Manage your clients and share them with your contacts.",
};

export default function ClientsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
