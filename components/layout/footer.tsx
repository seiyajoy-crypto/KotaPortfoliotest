"use client";

import { usePathname } from "next/navigation";

import { AnimatedDock } from "@/components/ui/animated-dock";
import { socialIconMap } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site-config";

// Footer を表示しないページ（About / Contact はページ内に SNS リンクがあるため）
const HIDDEN_ON = ["/about", "/contact"];

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <footer className="flex flex-col items-center gap-6 px-4 pt-16 pb-10">
      <AnimatedDock
        items={siteConfig.socialLinks.map((link) => {
          const Icon = socialIconMap[link.icon];
          return {
            link: link.href,
            target: "_blank",
            label: link.label,
            Icon: <Icon size={22} />,
          };
        })}
      />
      <p className="text-xs tracking-wide text-muted-foreground">
        &copy; {year} {siteConfig.siteName}
      </p>
    </footer>
  );
}
