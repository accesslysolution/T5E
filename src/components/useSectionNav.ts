"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

/* Height of the fixed header, plus breathing room. */
const HEADER_OFFSET = 96;

/* How long to keep waiting for a section to appear after navigating home. */
const SCROLL_WAIT_MS = 4000;

/**
 * Handles "/#section" links that may be clicked from any page.
 *
 * A bare <Link href="/#projects"> from another route asks Next to change the
 * route and resolve the hash in one step — but #projects doesn't exist in the
 * DOM yet when the scroll fires, so you land at the top of the home page.
 * This remembers the target, pushes "/", then scrolls once the section
 * actually appears.
 *
 * Returns an onClick handler to spread onto in-page links.
 */
export function useSectionNav() {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const pendingHash = useRef<string | null>(null);

  const isHome = pathname === "/";

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return false;

      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      return true;
    },
    [prefersReducedMotion]
  );

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return; // a real route — let Next handle it
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      e.preventDefault();
      const id = href.slice(2);

      if (isHome) {
        scrollToId(id);
        window.history.replaceState(null, "", href);
        return;
      }

      pendingHash.current = id;
      router.push("/");
    },
    [isHome, router, scrollToId]
  );

  useEffect(() => {
    if (pathname !== "/" || !pendingHash.current) return;

    const id = pendingHash.current;
    const started = performance.now();
    let raf = 0;
    const corrections: number[] = [];

    const attempt = () => {
      if (scrollToId(id)) {
        pendingHash.current = null;
        window.history.replaceState(null, "", `/#${id}`);

        // Media settles after first paint and shifts everything below it,
        // so re-measure a couple of times.
        corrections.push(
          window.setTimeout(() => scrollToId(id), 300),
          window.setTimeout(() => scrollToId(id), 800)
        );
        return;
      }

      if (performance.now() - started < SCROLL_WAIT_MS) {
        raf = requestAnimationFrame(attempt);
      } else {
        pendingHash.current = null;
      }
    };

    raf = requestAnimationFrame(attempt);

    return () => {
      cancelAnimationFrame(raf);
      corrections.forEach(window.clearTimeout);
    };
  }, [pathname, scrollToId]);

  return { handleNav, scrollToId, isHome };
}