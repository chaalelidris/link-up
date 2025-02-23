"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathName = usePathname();
  const navigationLinks = [
    {
      title: "Accueil",
      href: "/",
    },
    {
      title: "Tarifs",
      href: "/pricing",
    },
    {
      title: "Fonctionnalités",
      href: "/services",
    },
    {
      title: "Qui sommes-nous ?",
      href: "/about",
    },
    {
      title: "Contactez-nous",
      href: "/contact",
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="container mx-auto flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <Menu className="!size-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              headContent={
                <Link href="/">
                  <Logo />
                </Link>
              }
              side="left"
              className="w-full sm:w-[400px] p-6"
            >
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10 text-secondary">
                  <div className="space-y-2 py-6">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 hover:bg-gray-50 ${
                          pathName === link.href
                            ? "font-extrabold"
                            : "font-semibold"
                        }`}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex text-xl items-center gap-4 lg:gap-6 text-secondary">
          {navigationLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`${
                pathName === link.href ? "font-bold" : ""
              } hover:text-primary`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
