import type { Metadata } from "next";

import { IllustrationGallery } from "@/components/illustration/illustration-gallery";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Illustration" };

/**
 * Illustration ページ
 * 参照: Sorcepronpts/illustraterpage.txt
 * 画像は lib/images.ts の illustrationImages から読む（カテゴリ別に絞り込み可）。
 */
export default function IllustrationPage() {
  const { title } = siteConfig.illustration;

  return (
    <div className="w-full min-h-screen self-start overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <header className="mb-16 space-y-4">
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Gallery
          </p>
          <h1 className="font-serif text-5xl italic tracking-tight md:text-7xl">
            {title}
          </h1>
        </header>

        <IllustrationGallery />
      </div>
    </div>
  );
}
