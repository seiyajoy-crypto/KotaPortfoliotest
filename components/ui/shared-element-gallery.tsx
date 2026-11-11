"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * 参照: Sorcepronpts/illustraterpage.txt（shared-element-gallery）
 * 変更点: framer-motion → motion/react、モーダルの z-index を Header(z-50) より上に
 */

// --- Types ---
interface ImageData {
  id: string;
  src: string;
  alt?: string;
  title?: string;
}

interface GalleryContextType {
  selectedImage: ImageData | null;
  setSelectedImage: (image: ImageData | null) => void;
}

const GalleryContext = React.createContext<GalleryContextType | null>(null);

// --- Physics ---
const spring: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 35,
  mass: 1,
};

// --- Components ---

/**
 * Root Gallery Provider
 * Manages the state of the expanded image and renders the Modal.
 */
export function Gallery({ children }: { children: React.ReactNode }) {
  const [selectedImage, setSelectedImage] = React.useState<ImageData | null>(
    null,
  );

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  return (
    <GalleryContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
      <GalleryModal />
    </GalleryContext.Provider>
  );
}

/**
 * Responsive Masonry Grid
 */
export function GalleryGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Individual Gallery Image Thumbnail
 */
export function GalleryImage({
  src,
  thumbSrc,
  alt,
  title,
  id,
  className,
}: {
  src: string;
  /** 作品名（拡大表示時のみキャプションとして表示） */
  title?: string;
  /** グリッド表示用の縮小版（モーダルでは src を表示） */
  thumbSrc?: string;
  alt?: string;
  id: string;
  className?: string;
}) {
  const context = React.useContext(GalleryContext);
  if (!context) throw new Error("GalleryImage must be used within a Gallery");

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "relative mb-4 cursor-zoom-in overflow-hidden rounded-xl break-inside-avoid",
        className,
      )}
      onClick={() => context.setSelectedImage({ id, src, alt, title })}
    >
      <motion.img
        layoutId={`image-${id}`}
        src={thumbSrc ?? src}
        alt={alt || "Gallery Image"}
        loading="lazy"
        className="h-auto w-full rounded-xl object-cover"
        variants={{
          hover: { scale: 0.98 },
          tap: { scale: 0.95 },
        }}
        transition={spring}
      />

      {/* Subtle hover overlay for premium feel */}
      <motion.div
        variants={{
          hover: { opacity: 1 },
          tap: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        className="pointer-events-none absolute inset-0 rounded-xl bg-black/10"
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

/**
 * Expanded View Modal with Drag-to-Dismiss
 */
function GalleryModal() {
  const context = React.useContext(GalleryContext);
  if (!context) return null;

  const { selectedImage, setSelectedImage } = context;

  return (
    <AnimatePresence>
      {selectedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Frosted glass backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            onClick={() => setSelectedImage(null)}
          />

          {/* Interactive container for drag gesture */}
          <motion.div
            className="relative z-10 flex h-full w-full cursor-zoom-out items-center justify-center"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(_e, info) => {
              // Dismiss if dragged far enough or fast enough
              if (
                Math.abs(info.offset.y) > 100 ||
                Math.abs(info.velocity.y) > 300
              ) {
                setSelectedImage(null);
              }
            }}
            onClick={() => setSelectedImage(null)}
          >
            {/* The Shared Element */}
            <motion.img
              layoutId={`image-${selectedImage.id}`}
              src={selectedImage.src}
              alt={selectedImage.alt || "拡大表示中のイラスト"}
              className="h-auto max-h-[90vh] w-auto max-w-[95vw] rounded-xl object-contain shadow-2xl will-change-transform"
              draggable={false} // Prevent native drag to allow motion drag
              transition={spring}
            />
          </motion.div>

          {selectedImage.title && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-center text-sm text-white backdrop-blur-md"
            >
              {selectedImage.title}
            </motion.p>
          )}

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
            aria-label="ギャラリーを閉じる"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
