"use client";

import * as React from "react";
import { NavSecondary } from "@/components/nav-secondary";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import Link from "next/link";
import { Cards, LogoutCurve, People, Setting3 } from "iconsax-react";

const data = [
  {
    title: "Mes Cartes",
    url: "/dashboard",
    icon: Cards,
    subRoute: "/cards",
  },
  {
    title: "Mes Clients",
    url: "/dashboard/clients",
    icon: People,
  },
  {
    title: "Mes Pages",
    url: "#",
    icon: Cards,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Setting3,
  },
  {
    title: "Se déconnecter",
    url: "/login",
    icon: LogoutCurve,
    danger: true,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <Logo className="lg:!text-3xl hover:!text-primary cursor-pointer" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data} />
      </SidebarContent>
      <SidebarFooter className="text-center">
        © Tous droits réservés
      </SidebarFooter>
    </Sidebar>
  );
}
