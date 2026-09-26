"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { socialIconMap } from "@/components/icons/social-icons";
import type { ProfileSection, SocialIconName } from "@/lib/site-config";

/**
 * 参照: Sorcepronpts/AboutPage.txt（GlassmorphismProfileCard）
 * 変更点: JS → TS 化、SocialLink の icon を任意のコンポーネント型に、
 *         アクションボタンを next/link で遷移させる（参照は preventDefault していた）
 */

export type ProfileSocialLink = {
  id: string;
  // Server Component から関数を渡せないため、アイコンは名前で受け取って内部で解決する
  icon: SocialIconName;
  label: string;
  href: string;
  target?: string;
};

export type ProfileActionButton = {
  text: string;
  href: string;
};

export interface GlassmorphismProfileCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  sections: ProfileSection[];
  socialLinks?: ProfileSocialLink[];
  actionButton: ProfileActionButton;
  className?: string;
}

export const GlassmorphismProfileCard = ({
  avatarUrl,
  name,
  title,
  sections,
  socialLinks = [],
  actionButton,
  className,
}: GlassmorphismProfileCardProps) => {
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div
        className="relative flex flex-col items-center rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-xl transition-all duration-500 ease-out"
        style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="mb-4 h-24 w-24 rounded-full border-2 border-white/20 p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt={`${name}'s Avatar`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-card-foreground">{name}</h2>
        <p className="mt-1 text-sm font-medium text-primary">{title}</p>
        <dl className="mt-6 w-full space-y-4 text-left">
          {sections.map((section) => (
            <div key={section.heading}>
              <dt className="text-xs font-semibold tracking-wide text-card-foreground">
                {section.heading}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {section.body}
              </dd>
            </div>
          ))}
        </dl>

        <div className="my-6 h-px w-1/2 rounded-full bg-border" />

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((item) => (
            <SocialButton
              key={item.id}
              item={item}
              setHoveredItem={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          ))}
        </div>

        <ActionButton action={actionButton} />
      </div>

      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/50 to-purple-500/50 opacity-30 blur-2xl transition-all duration-500 ease-out" />
    </div>
  );
};

// --- Sub-components ---

const SocialButton = ({
  item,
  setHoveredItem,
  hoveredItem,
}: {
  item: ProfileSocialLink;
  setHoveredItem: (id: string | null) => void;
  hoveredItem: string | null;
}) => {
  const Icon = socialIconMap[item.icon];
  return (
    <div className="relative">
      <a
        href={item.href}
        target={item.target}
        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
        className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-secondary/50 transition-all duration-300 ease-out hover:bg-secondary"
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onFocus={() => setHoveredItem(item.id)}
        onBlur={() => setHoveredItem(null)}
        aria-label={item.label}
      >
        <div className="relative z-10 flex items-center justify-center">
          <Icon
            size={20}
            className="text-secondary-foreground/70 transition-all duration-200 ease-out group-hover:text-secondary-foreground"
          />
        </div>
      </a>
      <Tooltip item={item} hoveredItem={hoveredItem} />
    </div>
  );
};

const ActionButton = ({ action }: { action: ProfileActionButton }) => (
  <Link
    href={action.href}
    className="group mt-8 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95"
    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
  >
    <span>{action.text}</span>
    <ArrowUpRight
      size={16}
      className="transition-transform duration-300 ease-out group-hover:rotate-45"
    />
  </Link>
);

const Tooltip = ({
  item,
  hoveredItem,
}: {
  item: ProfileSocialLink;
  hoveredItem: string | null;
}) => (
  <div
    role="tooltip"
    className={cn(
      "pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-1.5 text-xs font-medium whitespace-nowrap text-popover-foreground backdrop-blur-md transition-all duration-300 ease-out",
      hoveredItem === item.id
        ? "translate-y-0 opacity-100"
        : "translate-y-2 opacity-0",
    )}
    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
  >
    {item.label}
    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-border bg-popover" />
  </div>
);
