export type NavItem = {
  label: string;
  href: string;
};

export type SocialIconName = "x" | "mail";

export type ProfileSection = {
  heading: string;
  body: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: SocialIconName;
};

export const siteConfig = {
  siteName: "Kota", // TODO: 確定後に差し替え
  tagline: "Illustration & Animation", // TODO: Hero 用コピー
  heroCopy: {
    // TODO: 文言確定後に差し替え
    sub: "Drawing worlds that move. Illustration and animation by Kota.",
    main: "Kota",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Illustration", href: "/illustration" },
    { label: "Animation", href: "/animation" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  socialLinks: [
    { id: "x", label: "X", href: "https://x.com/kota_2kx_", icon: "x" },
    {
      id: "mail",
      label: "Mail",
      href: "mailto:kota338kx@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],

  // About ページ
  profile: {
    name: "Kota",
    title: "Illustrator / Animator",
    sections: [
      {
        heading: "アニメーション",
        body: "アートアニメーション、キャラクターアニメーション",
      },
      {
        heading: "イラスト",
        body: "キャラクターイラスト、MVイラスト、カードゲームイラスト、キャラクターデザイン、etc...",
      },
      {
        heading: "使用ソフト",
        body: "Procreate、CLIP STUDIO PAINT",
      },
      {
        heading: "得意ジャンル",
        body: "かっこいい、ダーク、美しい、アングラ、クリーチャー、エフェクト",
      },
    ] satisfies ProfileSection[],
    avatarUrl: "/images/profile/avatar.webp",
  },

  // Illustration ページ
  illustration: {
    title: "Illustration",
    description:
      "Selected illustration works. Tap any image to expand, drag vertically to dismiss.",
  },

  // Animation ページ（TODO: 動画素材・文言は確定後に差し替え）
  animation: {
    title: "Motion Works",
    date: "Showreel 2026",
    scrollToExpand: "Scroll to expand",
    overview:
      "A collection of short animation pieces: character motion, loops and music visuals. Scroll to expand the showreel, then browse the works below.",
  },

  // Contact ページ
  contact: {
    heading: "Contact",
    lead: "Commissions, collaborations and general inquiries are welcome.",
    email: "kota338kx@gmail.com",
    x: { handle: "@kota_2kx_", href: "https://x.com/kota_2kx_" },
  },
};
