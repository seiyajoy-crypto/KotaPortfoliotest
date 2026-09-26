"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MotionValue,
  easeInOut,
  easeOut,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { stackImages } from "@/lib/images";

/**
 * Home ② ScrollStackGrid
 * scroll01.txt（写真スタック）と scroll.txt（パララックスグリッド）の融合セクション。
 *
 *  progress 0.0            0.4                      1.0
 *   | [Phase A: 展開]      | [Phase B: 流動]         |
 *   | 中央のスタックが       | 3 カラムのグリッドが      |
 *   | 散らばりながら         | 左右カラムが外側へ流れ、  |
 *   | 3 カラムに整列する      | 傾きながら上へ抜ける      |
 *
 * ホバー散開・クリック回転は実装しない（確定事項）。
 */

const PHASE_SPLIT = 0.4;
const GAP = 40; // scroll.txt の gap-10
const CARD_MAX_WIDTH = 480; // 参照は w-64。作品を大きく見せるため拡大
const CARD_ASPECT = 4 / 3; // 縦長イラスト（3:4 前後）がほぼ切れない比率
const STACK_STEP_Y = 8; // translateY(i * 0.5rem)
const STACK_STEP_SCALE = 0.05; // scale(1 - i * 0.05)

// scroll01.txt の rotate-2 / -rotate-2 / rotate-4 / -rotate-4 / rotate-6 ... に対応
const baseRotation = (i: number) =>
  (i % 2 === 0 ? 1 : -1) * (Math.floor(i / 2) + 1) * 2;

type Breakpoint = "sm" | "md" | "lg";

// 参照値: lg ±200px / ±20deg, md ±120px / ±12deg, sm は y のみ
const FLOW: Record<Breakpoint, { x: number; y: number; rotate: number }> = {
  lg: { x: 200, y: -200, rotate: 20 },
  md: { x: 120, y: -120, rotate: 12 },
  sm: { x: 0, y: -80, rotate: 0 },
};

type Layout = {
  width: number;
  height: number;
  cols: number;
  cardW: number;
  cardH: number;
  perCol: number;
  gridTop: number;
  scrollDist: number; // Phase B でグリッド全体が上へ流れる距離
  flow: { x: number; y: number; rotate: number };
};

function computeLayout(width: number, height: number, count: number): Layout {
  const bp: Breakpoint = width >= 1024 ? "lg" : width >= 768 ? "md" : "sm";
  const cols = bp === "lg" ? 3 : bp === "md" ? 2 : 1;
  // カラム中心の間隔（gridPosition の centers と対応）からギャップ分を引いた幅
  const colSpan = cols === 3 ? 0.3 : cols === 2 ? 0.44 : 0.85;
  const cardW = Math.min(
    CARD_MAX_WIDTH,
    width * colSpan - (cols === 1 ? 0 : GAP),
    // スタック時に画面内に収まる高さまで
    (height * 0.8) / CARD_ASPECT,
  );
  const cardH = cardW * CARD_ASPECT;
  const perCol = Math.ceil(count / cols);
  const gridTop = Math.max(96, height * 0.12);
  const gridHeight = perCol * cardH + (perCol - 1) * GAP;
  const scrollDist = Math.max(0, gridHeight + gridTop * 2 - height);

  return {
    width,
    height,
    cols,
    cardW,
    cardH,
    perCol,
    gridTop,
    scrollDist,
    flow: FLOW[bp],
  };
}

// カード i のグリッド上の左上座標（画像配列をカラム数で分割して振り分ける）
function gridPosition(layout: Layout, i: number) {
  const { width, cols, cardW, cardH, perCol, gridTop } = layout;
  const col = Math.floor(i / perCol);
  const row = i % perCol;
  const centers =
    cols === 3 ? [0.2, 0.5, 0.8] : cols === 2 ? [0.28, 0.72] : [0.5];
  const cx = centers[col] * width;
  return {
    col,
    row,
    x: cx - cardW / 2,
    y: gridTop + row * (cardH + GAP),
  };
}

// カード i のスタック時の左上座標（画面中央に重なる）
function stackPosition(layout: Layout, i: number) {
  const { width, height, cardW, cardH } = layout;
  return {
    x: width / 2 - cardW / 2,
    y: height / 2 - cardH / 2 + i * STACK_STEP_Y,
    scale: 1 - i * STACK_STEP_SCALE,
    rotate: baseRotation(i),
  };
}

type CardProps = {
  src: string;
  index: number;
  total: number;
  layout: Layout;
  progress: MotionValue<number>;
};

function StackCard({ src, index, total, layout, progress }: CardProps) {
  const stack = stackPosition(layout, index);
  const grid = gridPosition(layout, index);

  // Phase B の流動: 第 1 カラムは左上へ、最終カラムは右上へ、中央は動かない（参照どおり）
  const dir =
    layout.cols === 1
      ? 0
      : grid.col === 0
        ? -1
        : grid.col === layout.cols - 1
          ? 1
          : 0;
  const flowX = dir * layout.flow.x;
  const flowY = dir !== 0 ? layout.flow.y : 0;
  const flowRotate = dir * layout.flow.rotate;

  const keyframes = [0, PHASE_SPLIT, 1];
  const ease = [easeOut, easeInOut];

  const x = useTransform(
    progress,
    keyframes,
    [stack.x, grid.x, grid.x + flowX],
    { ease },
  );
  const y = useTransform(
    progress,
    keyframes,
    [stack.y, grid.y, grid.y - layout.scrollDist + flowY],
    { ease },
  );
  const scale = useTransform(progress, keyframes, [stack.scale, 1, 1], {
    ease,
  });
  const rotate = useTransform(
    progress,
    keyframes,
    [stack.rotate, 0, flowRotate],
    { ease },
  );

  return (
    <motion.div
      className="absolute top-0 left-0 overflow-hidden rounded-xl shadow-2xl"
      style={{
        x,
        y,
        scale,
        rotate,
        width: layout.cardW,
        height: layout.cardH,
        zIndex: total - index,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 44vw, 85vw"
        className="object-cover"
      />
    </motion.div>
  );
}

export function ScrollStackGrid({
  images = stackImages,
}: {
  images?: string[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [layout, setLayout] = useState<Layout | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // 見出しは展開が始まると消える
  const captionOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // prefers-reduced-motion 時は最初からグリッド表示（Phase A/B を省略）
  const staticProgress = useMotionValue(PHASE_SPLIT);
  const progress = reduceMotion ? staticProgress : scrollYProgress;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setLayout(computeLayout(width, height, images.length));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [images.length]);

  return (
    <section ref={wrapperRef} className="relative h-[300vh]" aria-label="Works">
      <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
        <motion.p
          style={{ opacity: captionOpacity }}
          className="pointer-events-none absolute top-24 left-6 z-20 text-[11px] tracking-[0.2em] text-muted-foreground uppercase sm:left-10"
        >
          Selected Works / Scroll
        </motion.p>

        {layout &&
          images.map((src, i) => (
            <StackCard
              key={src}
              src={src}
              index={i}
              total={images.length}
              layout={layout}
              progress={progress}
            />
          ))}
      </div>
    </section>
  );
}
