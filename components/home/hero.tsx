import Image from "next/image";

import { heroImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

// 見出し画像（public/images/hero/hero.webp）の実寸
const HERO_WIDTH = 1697;
const HERO_HEIGHT = 2400;

/**
 * Home ① Hero
 * 参照: Sorcepronpts/Hero.txt (demo.tsx)
 * 変更点: 画像上の文字を外し、見出し画像を画面幅いっぱいに全面表示する。
 * 高さは縦横比のまま伸ばし、スクロールで画像全体を見せる。
 * 見出しテキストはスクリーンリーダー / 検索向けに視覚的に隠して残す。
 */
export function Hero() {
  return (
    <section>
      <h1 className="sr-only">
        {siteConfig.heroCopy.main} — {siteConfig.heroCopy.sub}
      </h1>
      <Image
        alt=""
        priority
        src={heroImage}
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        sizes="100vw"
        className="block h-auto w-full"
      />
    </section>
  );
}
