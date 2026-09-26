import type { Metadata } from "next";

import { AnimationShowcase } from "@/components/animation/animation-showcase";

export const metadata: Metadata = { title: "Animation" };

/**
 * Animation ページ
 * 参照: Sorcepronpts/Animationpage.txt
 * 動画・作品一覧は lib/images.ts の animationShowreel / animationWorks から読む。
 */
export default function AnimationPage() {
  return <AnimationShowcase />;
}
