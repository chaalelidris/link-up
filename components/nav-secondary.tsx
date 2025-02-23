import * as React from "react";
import { type Icon } from "iconsax-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    subRoute?: string;
    icon: Icon;
    danger?: boolean;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathName = usePathname();
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                size="lg"
                className={cn(
                  "font-bold",
                  item.danger ? "text-destructive hover:text-destructive" : "",
                  pathName.startsWith(
                    `${item.url}${item.subRoute ? item.subRoute : ""}`
                  ) || pathName === item.url
                    ? "bg-primary text-muted hover:bg-secondary hover:text-muted"
                    : ""
                )}
              >
                <a href={item.url}>
                  <item.icon className="!size-6" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
