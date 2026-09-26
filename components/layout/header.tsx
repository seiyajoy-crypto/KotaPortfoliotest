"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Clapperboard, Home, Mail, Palette, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { MenuBar, type MenuItem } from "@/components/ui/glow-menu";
import { siteConfig } from "@/lib/site-config";

/**
 * 参照: Sorcepronpts/Header.txt（glow-menu の MenuBar）
 * ナビ項目は site-config.ts の nav を元に、アイコン・グロー色をここで付与する。
 */
const navDecor: Record<
  string,
  Pick<MenuItem, "icon" | "gradient" | "iconColor" | "hoverIconColor">
> = {
  "/": {
    icon: Home,
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
    hoverIconColor: "group-hover:text-blue-500",
  },
  "/about": {
    icon: User,
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
    hoverIconColor: "group-hover:text-orange-500",
  },
  "/illustration": {
    icon: Palette,
    gradient:
      "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)",
    iconColor: "text-pink-500",
    hoverIconColor: "group-hover:text-pink-500",
  },
  "/animation": {
    icon: Clapperboard,
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
    hoverIconColor: "group-hover:text-green-500",
  },
  "/contact": {
    icon: Mail,
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
    hoverIconColor: "group-hover:text-red-500",
  },
};

const menuItems: MenuItem[] = siteConfig.nav.map((item) => ({
  label: item.label,
  href: item.href,
  ...navDecor[item.href],
}));

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 0);
  });

  const activeItem =
    menuItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
    )?.label ?? "Home";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300",
        scrolled
          ? "bg-black/40 shadow-[0_1px_0_0_rgb(255_255_255/0.06)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl"
        >
          {siteConfig.siteName}
        </Link>

        <MenuBar items={menuItems} activeItem={activeItem} aria-label="Main" />
      </div>
    </header>
  );
}
