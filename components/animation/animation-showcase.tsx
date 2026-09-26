"use client";

import { useEffect } from "react";
import Image from "next/image";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { animationShowreel, animationWorks } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

/**
 * Animation ページ本体
 * 参照: Sorcepronpts/Animationpage.txt（demo.tsx の VideoExpansionTextBlend）
 * スクロールで動画が全画面へ拡張し、そのあと作品一覧が表示される。
 */
export function AnimationShowcase() {
  const { title, date, scrollToExpand, overview } = siteConfig.animation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={animationShowreel.src}
        posterSrc={animationShowreel.poster}
        bgImageSrc={animationShowreel.background}
        title={title}
        date={date}
        scrollToExpand={scrollToExpand}
        textBlend
        textClassName="text-white"
      >
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Animation
          </p>
          <h2 className="mt-2 mb-6 font-serif text-4xl italic md:text-5xl">
            Works
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
            {overview}
          </p>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {animationWorks.map((work) => (
              <li key={work.id} className="group">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-muted shadow-sm">
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium">{work.title}</h3>
                  <span className="text-xs tracking-wide text-muted-foreground">
                    {work.year}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
