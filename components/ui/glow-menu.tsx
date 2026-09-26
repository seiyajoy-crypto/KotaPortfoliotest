"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Transition, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * 参照: Sorcepronpts/Header.txt（21st.dev glow-menu の MenuBar）
 * 変更点:
 *  - ボタンではなく next/link で遷移する（href を使用）
 *  - ライトテーマ固定のため next-themes を使わない
 *  - Tailwind v4 では動的クラス名（`group-hover:${...}`）が生成されないので
 *    hoverIconColor を明示的に受け取る
 */
export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  gradient: string;
  iconColor: string; // 例: "text-blue-500"
  hoverIconColor: string; // 例: "group-hover:text-blue-500"
}

export interface MenuBarProps {
  className?: string;
  "aria-label"?: string;
  items: MenuItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
  /** md 未満でラベルを隠してアイコンのみにする */
  compactOnMobile?: boolean;
}

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const sharedTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  (
    { className, items, activeItem, onItemClick, compactOnMobile = true, ...props },
    ref,
  ) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-b from-background/80 to-background/40 p-1.5 shadow-lg backdrop-blur-lg sm:p-2",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute -inset-2 z-0 rounded-3xl bg-radial from-transparent via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90% to-transparent"
          variants={navGlowVariants}
        />
        <ul className="relative z-10 flex items-center gap-1 sm:gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === activeItem;

            const face = (
              <>
                <span
                  className={cn(
                    "transition-colors duration-300",
                    isActive ? item.iconColor : "text-foreground",
                    item.hoverIconColor,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    compactOnMobile && "hidden md:inline",
                  )}
                >
                  {item.label}
                </span>
              </>
            );

            const faceClass = cn(
              "flex items-center gap-2 rounded-xl bg-transparent px-3 py-2 transition-colors sm:px-4",
              isActive
                ? "text-foreground"
                : "text-muted-foreground group-hover:text-foreground",
            );

            return (
              <motion.li key={item.label} className="relative">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  onClick={() => onItemClick?.(item.label)}
                  className="block w-full"
                >
                  <motion.div
                    className="group relative block overflow-visible rounded-xl"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-0"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(faceClass, "relative z-10")}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      {face}
                    </motion.div>
                    <motion.div
                      className={cn(faceClass, "absolute inset-0 z-10")}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      {face}
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    );
  },
);

MenuBar.displayName = "MenuBar";
