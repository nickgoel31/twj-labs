import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export function useSmoothScroll(ease = 0.08) {
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef<number>(0);
  const pathname = usePathname();

  // Reset scroll on navigation
  useEffect(() => {
    currentY.current = 0;
    targetY.current = 0;
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Lock native scroll on <html>
    document.documentElement.style.overflow = "hidden";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY.current = Math.max(
        0,
        Math.min(
          targetY.current + e.deltaY,
          document.body.scrollHeight - window.innerHeight
        )
      );
    };

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (hash && hash !== '#') {
          const el = document.querySelector(hash);
          if (el) {
            e.preventDefault();
            const top = el.getBoundingClientRect().top + window.scrollY;
            targetY.current = Math.max(
              0,
              Math.min(top, document.body.scrollHeight - window.innerHeight)
            );
          }
        }
      }
    };

    const tick = () => {
      currentY.current = lerp(currentY.current, targetY.current, ease);

      // Stop animating when close enough (avoids infinite loop)
      if (Math.abs(targetY.current - currentY.current) < 0.05) {
        currentY.current = targetY.current;
      }

      window.scrollTo(0, currentY.current);
      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onAnchorClick);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId.current);
    };
  }, [ease]);
}