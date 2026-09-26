import type { SVGProps } from "react";
import { Mail } from "lucide-react";

import type { SocialIconName } from "@/lib/site-config";

// lucide-react v1 系ではブランドアイコンが削除されているため、
// X は lucide と同じ 24px・stroke 2 のスタイルで自前定義する。

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

export const MailIcon = ({ size = 22, ...props }: IconProps) => (
  <Mail size={size} aria-hidden {...props} />
);

export const socialIconMap: Record<
  SocialIconName,
  (props: IconProps) => React.JSX.Element
> = {
  x: XIcon,
  mail: MailIcon,
};
