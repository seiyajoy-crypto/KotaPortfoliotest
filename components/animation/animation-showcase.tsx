"use client";

import { useEffect, useState } from "react";

import { CategoryTabs } from "@/components/ui/category-tabs";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import {
  animationCategories,
  animationShowreel,
  animationWorks,
  type AnimationCategory,
} from "@/lib/images";
import { siteConfig } from "@/lib/site-config";

/**
 * Animation ページ本体
 * 参照: Sorcepronpts/Animationpage.txt（demo.tsx の VideoExpansionTextBlend）
 * スクロールで動画が全画面へ拡張し、そのあと作品一覧が表示される。
 * 作品一覧は元フォルダ（お仕事 / 自主制作）ごとにタブで絞り込める。
 */
type Filter = "all" | AnimationCategory;

const tabs = [
  { id: "all" as Filter, label: "All", count: animationWorks.length },
  ...animationCategories.map(({ id, label }) => ({
    id: id as Filter,
    label,
    count: animationWorks.filter((work) => work.category === id).length,
  })),
];

export function AnimationShowcase() {
  const { title, date, scrollToExpand } = siteConfig.animation;
  const [filter, setFilter] = useState<Filter>("all");

  const works =
    filter === "all"
      ? animationWorks
      : animationWorks.filter((work) => work.category === filter);

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
            Gallery
          </p>
          <h2 className="mt-2 mb-10 font-serif text-4xl italic md:text-5xl">
            Animation
          </h2>

          <CategoryTabs
            tabs={tabs}
            value={filter}
            onChange={setFilter}
            className="mb-10"
          />

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <li key={work.id} className="group">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-sm">
                  {/* 縦長作品は黒帯付きで全体を表示 */}
                  <video
                    src={work.video}
                    poster={work.thumbnail}
                    controls
                    playsInline
                    preload="none"
                    aria-label={work.title}
                    className={
                      work.vertical
                        ? "h-full w-full object-contain"
                        : "h-full w-full object-cover"
                    }
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium">{work.title}</h3>
                  {work.year && (
                    <span className="text-xs tracking-wide text-muted-foreground">
                      {work.year}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
