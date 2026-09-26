"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, stagger, useAnimate, useInView } from "motion/react";

import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { Button } from "@/components/ui/button";
import { floatingImages } from "@/lib/images";

/**
 * Home ③ FloatingGateway
 * 参照: Sorcepronpts/Illustrater.txt (demo.tsx)
 * 役割: Illustration ページへの導線専用。
 * 変更点: 黒背景を白に、中央テキストを Illustration 導線に変更。
 *         ページ最下部にあるため、フェードインはビューポートに入ったタイミングで開始する。
 */

const GATEWAY_HREF = "/illustration";

// 参照の配置座標・depth をそのまま採用
const placements = [
  { depth: 0.5, position: "top-[8%] left-[11%]", size: "w-16 h-16 md:w-24 md:h-24" },
  { depth: 1, position: "top-[10%] left-[32%]", size: "w-20 h-20 md:w-28 md:h-28" },
  { depth: 2, position: "top-[2%] left-[53%]", size: "w-28 h-40 md:w-40 md:h-52" },
  { depth: 1, position: "top-[0%] left-[83%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 1, position: "top-[40%] left-[2%]", size: "w-28 h-28 md:w-36 md:h-36" },
  { depth: 2, position: "top-[70%] left-[77%]", size: "w-28 h-28 md:w-36 md:h-48" },
  { depth: 4, position: "top-[73%] left-[15%]", size: "w-40 h-28 md:w-52 md:h-36" },
  { depth: 1, position: "top-[80%] left-[50%]", size: "w-24 h-24 md:w-32 md:h-32" },
];

export function FloatingGateway({
  images = floatingImages,
}: {
  images?: string[];
}) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) });
  }, [inView, animate]);

  return (
    <section
      ref={scope}
      className="relative flex h-[90vh] min-h-[600px] w-full items-center justify-center overflow-hidden"
      aria-label="Illustration gateway"
    >
      <motion.div
        className="z-50 flex flex-col items-center space-y-5 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.88, delay: 1.2 }}
      >
        <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Gallery
        </p>
        <h2 className="font-serif text-6xl italic md:text-8xl">Illustration</h2>
        <Button
          size="lg"
          className="h-11 rounded-full px-7 text-sm"
          nativeButton={false}
          render={<Link href={GATEWAY_HREF} />}
        >
          View Works
        </Button>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        {placements.map((p, i) => (
          <FloatingElement key={i} depth={p.depth} className={p.position}>
            <Link href={GATEWAY_HREF} aria-label="Illustration ページへ" tabIndex={-1}>
              {/* useAnimate("img") の stagger フェードイン対象。opacity-0 から inline style で 1 へ */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[i]}
                alt=""
                loading="lazy"
                className={`${p.size} cursor-pointer object-cover opacity-0 transition-transform duration-200 hover:scale-105`}
              />
            </Link>
          </FloatingElement>
        ))}
      </Floating>
    </section>
  );
}
