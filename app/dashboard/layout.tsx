import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { DirectNotification, Profile, SearchNormal1 } from "iconsax-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Cards - LinkUp",
  description: "Manage your cards and share them with your contacts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="absolute h-screen bg-home-backround-image w-full inset-0 z-0 rotate-180 opacity-20" />
        <div className="relative z-10">
          <header className="flex h-16 shrink-0 items-center gap-2 ">
            <div className="flex-1 relative px-1">
              <form>
                <div className="absolute top-1/2 left-3 transform -translate-y-1/2 flex gap-2">
                  <SidebarTrigger type="button" />
                  <SearchNormal1 className=" size-6 text-muted-foreground" />
                </div>
                <Input
                  id="search"
                  type="search"
                  placeholder="Tapez quelque chose à rechercher"
                  className="bg-white w-full px-20 p text-base py-4 h-auto rounded-lg"
                  required
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex gap-2">
                  <DirectNotification className="size-6 text-muted-foreground cursor-pointer" />
                  <Profile className="size-6 text-muted-foreground cursor-pointer" />
                </div>
              </form>
            </div>
          </header>{" "}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
            {children}
            <Toaster />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
