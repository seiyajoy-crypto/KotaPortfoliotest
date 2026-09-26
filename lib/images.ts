// 実素材は public/images/** と public/videos/** に配置している。
// 元データは テスト/ フォルダ。Web 用に WebP へ縮小したものを使う。

const illust = (name: string) => `/images/illustration/${name}.webp`;
const illustThumb = (name: string) => `/images/illustration/thumb/${name}.webp`;

// 見出し（Hero）
export const heroImage = "/images/hero/hero.webp";

// Home 融合セクション（縦長イラスト 9 枚）
export const stackImages = [
  "illust-01",
  "illust-02",
  "illust-03",
  "illust-04",
  "illust-05",
  "illust-06",
  "illust-07",
  "illust-08",
  "illust-09",
].map(illust);

// Home 浮遊セクション（<img> で直接表示するので縮小版を使う）
export const floatingImages = [
  "illust-10",
  "illust-11",
  "illust-12",
  "illust-13",
  "illust-14",
  "illust-15",
  "illust-wide-01",
  "illust-wide-02",
].map(illustThumb);

// Illustration ページ（全作品。横長作品を間に混ぜてマソンリーに変化を付ける）
const illustrationNames = [
  "illust-01",
  "illust-02",
  "illust-wide-01",
  "illust-03",
  "illust-04",
  "illust-05",
  "illust-wide-02",
  "illust-06",
  "illust-07",
  "illust-08",
  "illust-09",
  "illust-wide-03",
  "illust-10",
  "illust-11",
  "illust-12",
  "illust-13",
  "illust-14",
  "illust-15",
];

export type IllustrationImage = { id: string; src: string; alt: string };

export const illustrationImages: IllustrationImage[] = illustrationNames.map(
  (name, i) => ({
    id: name,
    src: illust(name),
    alt: `Illustration ${i + 1}`,
  }),
);

// Animation ページ
export const animationShowreel = {
  src: "/videos/lumipus-works.mp4",
  poster: "/images/animation/lumipus-works.webp",
  background: illust("illust-wide-01"),
};

export type AnimationWork = {
  id: string;
  title: string;
  year: string;
  thumbnail: string;
};

export const animationWorks: AnimationWork[] = [
  {
    id: "lumipus-works",
    title: "Lumipus Works",
    year: "2026",
    thumbnail: "/images/animation/lumipus-works.webp",
  },
  {
    id: "rokunowa",
    title: "六ノ輪",
    year: "2026",
    thumbnail: "/images/animation/rokunowa.webp",
  },
];
