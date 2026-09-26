import type { SVGProps } from "react";
import { Mail } from "lucide-react";

import type { SocialIconName } from "@/lib/site-config";

// lucide-react v1 系ではブランドアイコンが削除されているため、
// X / Instagram / YouTube は lucide と同じ 24px・stroke 2 のスタイルで自前定義する。

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const XIcon = ({ size = 22, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M4 4l16 16" />
    <path d="M20 4L4 20" />
  </svg>
);

export const InstagramIcon = ({ size = 22, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const YoutubeIcon = ({ size = 22, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export const MailIcon = ({ size = 22, ...props }: IconProps) => (
  <Mail size={size} aria-hidden {...props} />
);

export const socialIconMap: Record<
  SocialIconName,
  (props: IconProps) => React.JSX.Element
> = {
  x: XIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  mail: MailIcon,
};
