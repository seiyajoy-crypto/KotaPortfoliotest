// 実素材は public/images/** と public/videos/** に配置している。
// 元データは image/ フォルダ。Web 用に WebP / MP4 へ縮小したものを使う。
// イラストは元フォルダごとに public/images/illustration/{works,original,fanart}/ へ分けている。
// 動画は image/movie/{Works,Original} の区分を AnimationWork.category で持つ。

export type IllustrationCategory = "works" | "original" | "fanart";

const illust = (category: IllustrationCategory, id: string) =>
  `/images/illustration/${category}/${id}.webp`;
const illustThumb = (category: IllustrationCategory, id: string) =>
  `/images/illustration/${category}/thumb/${id}.webp`;

const range = (prefix: string, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `${prefix}-${String(i + 1).padStart(2, "0")}`,
  );

// 見出し（Hero）
export const heroImage = "/images/hero/hero.webp";

// Home 融合セクション（縦長イラスト 9 枚）
export const stackImages = range("o", 9).map((id) => illust("original", id));

// Home 浮遊セクション（<img> で直接表示するので縮小版を使う）
export const floatingImages = [
  "f-01",
  "f-06",
  "f-12",
  "f-13",
  "f-14",
  "f-15",
  "f-18",
  "f-20",
].map((id) => illustThumb("fanart", id));

// Illustration ページ（フォルダ = カテゴリ）
export const illustrationCategories: {
  id: IllustrationCategory;
  label: string;
}[] = [
  { id: "works", label: "Works" },
  { id: "original", label: "Original" },
  { id: "fanart", label: "Fan Art" },
];

export type IllustrationImage = {
  id: string;
  src: string;
  thumb: string;
  alt: string;
  category: IllustrationCategory;
  /** 作品名（お仕事イラストのみ。カードと拡大表示にキャプションとして出す） */
  title?: string;
};

const toImages = (
  category: IllustrationCategory,
  label: string,
  ids: string[],
): IllustrationImage[] =>
  ids.map((id, i) => ({
    id,
    src: illust(category, id),
    thumb: illustThumb(category, id),
    alt: `${label} ${i + 1}`,
    category,
  }));

// お仕事イラスト（元データ: 案件/ フォルダ。ファイル名をタイトルに使用）
const worksTitles = [
  "GCG「アスラン・ザラ」",
  "GCG「アンドリュー・バルトフェルド」",
  "GCG「ガルマ・ザビ」",
  "GCG「シャリアブル」",
  "GCG「パプテマス・シロッコ」",
  "GCG「世界の歪み」",
  "GCG「人の業」ショップバトルプロモ",
  "GCG「知将のプライド」",
  "GCG「頼れる兄貴分」",
  "Ten.様「テオ」歌ってみた",
  "ハンニャコッパ様「愛して愛して愛して」歌ってみた",
  "ラスティカ様 ご依頼イラスト",
  "夏ヶ瀬様「1/3の純情な感情」歌ってみた",
  "春猿火様「BURN WRATH」歌ってみた",
  "春猿火様「アウターサイエンス」歌ってみた",
  "春猿火様「ヘッドフォンアクター」歌ってみた",
  "春猿火様「ロスタイムメモリー」歌ってみた",
  "黑天にゃぎ。様 ご依頼イラスト",
];

const worksImages: IllustrationImage[] = worksTitles.map((title, i) => {
  const id = `c-${String(i + 1).padStart(2, "0")}`;
  return {
    id,
    src: illust("works", id),
    thumb: illustThumb("works", id),
    alt: title,
    category: "works",
    title,
  };
});

export const illustrationImages: IllustrationImage[] = [
  ...worksImages,
  ...toImages("original", "オリジナルイラスト", range("o", 13)),
  ...toImages("fanart", "ファンアート", range("f", 56)),
];

// Animation ページ
export const animationShowreel = {
  src: "/videos/pupa.mp4",
  poster: "/images/animation/pupa.webp",
  background: illust("original", "o-01"),
};

export type AnimationCategory = "works" | "original";

export const animationCategories: {
  id: AnimationCategory;
  label: string;
}[] = [
  { id: "works", label: "Works" },
  { id: "original", label: "Original" },
];

export type AnimationWork = {
  id: string;
  title: string;
  category: AnimationCategory;
  year?: string;
  video: string;
  thumbnail: string;
  vertical?: boolean;
};

const work = (
  id: string,
  title: string,
  category: AnimationCategory,
  year?: string,
  vertical?: boolean,
): AnimationWork => ({
  id,
  title,
  category,
  year,
  video: `/videos/${id}.mp4`,
  thumbnail: `/images/animation/${id}.webp`,
  vertical,
});

// TODO: 作品タイトル・年は確定後に差し替え（現状は元ファイル名ベース）
export const animationWorks: AnimationWork[] = [
  // image/movie/Works（お仕事）
  work("pupa", "pupa", "works", "2026"),
  work("lumipus-works", "lumipus", "works"),
  work("rokunowa", "六ノ輪", "works"),
  // image/movie/Original（自主制作）
  work("work-2026-01", "Work 2026", "original", "2026"),
  work("work-2025-01", "Work 2025", "original", "2025", true),
  work("work-2024-02", "Work 2024 — II", "original", "2024"),
  work("work-2024-01", "Work 2024 — I", "original", "2024"),
  work("work-2023-01", "Work 2023", "original", "2023"),
];
