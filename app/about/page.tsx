import type { Metadata } from "next";

import { GlassmorphismProfileCard } from "@/components/ui/profile-card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "About" };

/**
 * About ページ
 * 参照: Sorcepronpts/AboutPage.txt
 * プロフィール情報は lib/site-config.ts の profile / socialLinks から読む。
 */
export default function AboutPage() {
  const { profile, socialLinks } = siteConfig;

  return (
    <section className="flex min-h-screen w-full items-center justify-center px-4 pt-28 pb-16 sm:px-8">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Profile
          </p>
          <h1 className="mt-2 font-serif text-5xl italic md:text-7xl">About</h1>
        </div>

        <GlassmorphismProfileCard
          avatarUrl={profile.avatarUrl}
          name={profile.name}
          title={profile.title}
          sections={profile.sections}
          socialLinks={socialLinks.map((link) => ({
            id: link.id,
            label: link.label,
            href: link.href,
            target: "_blank",
            icon: link.icon,
          }))}
          actionButton={{ text: "Contact Me", href: "/contact" }}
        />
      </div>
    </section>
  );
}
