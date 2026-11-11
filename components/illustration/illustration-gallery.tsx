"use client";

import { useState } from "react";

import { CategoryTabs } from "@/components/ui/category-tabs";
import {
  Gallery,
  GalleryGrid,
  GalleryImage,
} from "@/components/ui/shared-element-gallery";
import {
  illustrationCategories,
  illustrationImages,
  type IllustrationCategory,
} from "@/lib/images";

type Filter = "all" | IllustrationCategory;

const tabs = [
  { id: "all" as Filter, label: "All", count: illustrationImages.length },
  ...illustrationCategories.map(({ id, label }) => ({
    id: id as Filter,
    label,
    count: illustrationImages.filter((image) => image.category === id).length,
  })),
];

/**
 * Illustration ページのギャラリー本体
 * 元フォルダ（お仕事 / オリジナル / 二次創作）ごとにタブで絞り込める。
 */
export function IllustrationGallery() {
  const [filter, setFilter] = useState<Filter>("all");

  const images =
    filter === "all"
      ? illustrationImages
      : illustrationImages.filter((image) => image.category === filter);

  return (
    <>
      <CategoryTabs
        tabs={tabs}
        value={filter}
        onChange={setFilter}
        className="mb-10"
      />

      <Gallery>
        {/* key でカテゴリ切替時にマソンリーを組み直す */}
        <GalleryGrid key={filter}>
          {images.map((image) => (
            <GalleryImage
              key={image.id}
              id={image.id}
              src={image.src}
              thumbSrc={image.thumb}
              alt={image.alt}
              title={image.title}
            />
          ))}
        </GalleryGrid>
      </Gallery>
    </>
  );
}
