'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import './hero.css';

/* -------------------------------------------------------------------------- */
/*  useStickyGuard                                                             */
/*  position: sticky fails silently when any scroll ancestor clips overflow.   */
/*  The usual offender is `overflow-x: hidden` on html/body/main, added to     */
/*  kill horizontal scroll. `clip` does the same job without creating a        */
/*  scroll container, so we swap it — and warn about anything we can't fix.    */
/* -------------------------------------------------------------------------- */

function useStickyGuard(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    const undo: Array<() => void> = [];
    const blockers: HTMLElement[] = [];

    const chain: HTMLElement[] = [];
    let node: HTMLElement | null = ref.current.parentElement;
    while (node) {
      chain.push(node);
      node = node.parentElement;
    }
    chain.push(document.body, document.documentElement);

    for (const el of chain) {
      const cs = getComputedStyle(el);

      if (cs.overflowX === 'hidden') {
        const prev = el.style.overflowX;
        el.style.overflowX = 'clip';
        undo.push(() => {
          el.style.overflowX = prev;
        });
      }

      // A clipped or scrolling Y axis is a genuine scroll container. Changing
      // it could break the page layout, so flag it instead of touching it.
      const clipsY = cs.overflowY !== 'visible' && cs.overflowY !== 'clip';
      if (clipsY && cs.overflowY !== 'auto') blockers.push(el);
    }

    if (process.env.NODE_ENV !== 'production' && blockers.length) {
      console.warn(
        '[T5E Hero] These ancestors clip vertical overflow and will break the ' +
          'sticky scrub. Remove overflow-hidden from them:',
        blockers
      );
    }

    return () => undo.forEach((fn) => fn());
  }, [ref]);
}

/* -------------------------------------------------------------------------- */
/*  Chapter                                                                    */
/* -------------------------------------------------------------------------- */

interface ChapterProps {
  progress: MotionValue<number>;
  /** Strictly increasing: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd].
      Start below zero to have a chapter already visible on the first frame. */
  range: [number, number, number, number];
  align?: 'left' | 'right' | 'center';
  /** 'bare' drops the glass panel — for the centred title card. */
  variant?: 'glass' | 'bare';
  children: React.ReactNode;
}

function Chapter({
  progress,
  range,
  align = 'left',
  variant = 'glass',
  children,
}: ChapterProps) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0, 0, -40]);
  const scale = useTransform(progress, range, [0.97, 1, 1, 1.015]);
  const pointerEvents = useTransform(progress, (v) =>
    v > range[1] - 0.02 && v < range[2] + 0.02 ? 'auto' : 'none'
  );

  const alignClass =
    align === 'right'
      ? 't5e-chapter--right'
      : align === 'center'
        ? 't5e-chapter--center'
        : '';

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents }}
      className={`t5e-chapter ${alignClass}`}
    >
      {variant === 'bare' ? (
        <div className="t5e-intro">{children}</div>
      ) : (
        <div className="t5e-glass">{children}</div>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared content                                                             */
/* -------------------------------------------------------------------------- */

const PILLS = ['Premium Estates', 'Inspired by Nature', 'Urban Sanctuaries'];

function Pills() {
  return (
    <div className="t5e-pills">
      {PILLS.map((pill) => (
        <span key={pill} className="t5e-pill">
          {pill}
        </span>
      ))}
    </div>
  );
}

function Actions() {
  return (
    <div className="t5e-actions">
      <button type="button" className="t5e-btn t5e-btn--primary">
        Book a site visit
      </button>
      <button type="button" className="t5e-btn t5e-btn--ghost">
        Download brochure
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MobileHero                                                                 */
/*  No scrubbing here by design: iOS seeks slowly, and the every-frame-keyframe */
/*  encode the desktop scrub needs is far too heavy for a mobile connection.    */
/*  A short muted loop gives the same cinematic feel for a fraction of the      */
/*  bytes — and the poster still carries LCP.                                   */
/* -------------------------------------------------------------------------- */

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

function MobileHero({
  headlineId,
  allowVideo,
}: {
  headlineId: string;
  allowVideo: boolean;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Hold the video back until the poster has painted, so it never competes
  // with LCP. requestIdleCallback where available, a timeout everywhere else.
  useEffect(() => {
    if (!allowVideo) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    if (conn?.saveData) return;
    if (conn?.effectiveType && /2g|slow-2g|3g/.test(conn.effectiveType)) return;

    // Looping playback never seeks, so the every-frame-keyframe encode buys
    // nothing here — swap in a smaller mobile cut if the file size bites.
    const load = () => setSrc('/hero.mp4');

    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;

    if (ric) {
      const id = ric(load);
      return () => {
        const cancel = (
          window as Window & { cancelIdleCallback?: (h: number) => void }
        ).cancelIdleCallback;
        cancel?.(id);
      };
    }

    const t = window.setTimeout(load, 900);
    return () => window.clearTimeout(t);
  }, [allowVideo]);

  return (
    <section className="t5e-mobile" aria-labelledby={headlineId}>
      <div className="t5e-mobile__media">
        {/* The poster attribute carries the frame before playback and stays put
            entirely when the video never loads (save-data, 2G/3G, reduced
            motion). It is also what the browser paints for LCP. */}
        <video
          src={src ?? undefined}
          poster="/img/hero-poster.jpg"
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label="T5E — The 5 Elements, a residential development in Wagholi, Pune, at dusk"
          onCanPlay={() => setReady(true)}
          className={`t5e-media__video is-visible ${ready ? 'is-ready' : ''}`}
        />
        <div className="t5e-scrim t5e-scrim--mobile" aria-hidden="true" />
      </div>

      <header className="t5e-brandbar">
        <span className="t5e-mark">T5E</span>
        <span className="t5e-brandbar__place">Wagholi, Pune</span>
      </header>

      <motion.div
        className="t5e-mobile__body"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="t5e-glass">
          <motion.div variants={rise}>
            <Pills />
          </motion.div>

          <motion.h1 variants={rise} id={headlineId} className="t5e-display">
            Redefining
            <span className="t5e-display__accent">Living</span>
          </motion.h1>

          <motion.p variants={rise} className="t5e-body">
            Visionary spaces where luxury meets sustainability, designed in
            harmony with nature.
          </motion.p>

          <motion.div variants={rise}>
            <Actions />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  ScrubHero                                                                  */
/*  Mounted only when scrubbing is actually on, so useScroll's target ref is   */
/*  guaranteed to be attached to a live DOM node on first effect. Calling      */
/*  useScroll in a component that might return early is what produces the      */
/*  "Target ref is defined but not hydrated" error.                            */
/* -------------------------------------------------------------------------- */

function ScrubHero({ headlineId }: { headlineId: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useStickyGuard(wrapperRef);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // The spring IS the smoothing. Video playhead and text both read from it,
  // so they can never drift apart.
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.4,
    restDelta: 0.0005,
  });

  /* ---- fetch the clip into memory so seeking is instant ------------------ */

  useEffect(() => {
    let objectUrl: string | null = null;
    let alive = true;

    fetch('/hero.mp4')
      .then((r) => r.blob())
      .then((blob) => {
        if (!alive) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
      })
      .catch(() => {
        // Network-streamed fallback — seeking is choppier but it still works.
        if (alive) setVideoSrc('/hero.mp4');
      });

    return () => {
      alive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  /* ---- one rAF loop, one writer to currentTime --------------------------- */

  useEffect(() => {
    if (!videoReady) return;
    let raf = 0;
    let lastWritten = -1;

    const tick = () => {
      const video = videoRef.current;
      const duration = durationRef.current;

      if (video && duration > 0 && video.readyState >= 2) {
        const p = Math.min(Math.max(progress.get(), 0), 1);
        // Stop a hair short of the end — seeking to exact duration can hold a
        // black frame on some decoders.
        const time = p * (duration - 0.05);

        // Only write when the change is worth a repaint (~1 frame at 60fps).
        if (Math.abs(time - lastWritten) > 0.016) {
          lastWritten = time;
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(time);
          } else {
            video.currentTime = time;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [videoReady, progress]);

  /* ---- prime the decoder ------------------------------------------------- */

  useEffect(() => {
    if (!videoSrc) return;
    const prime = async () => {
      const video = videoRef.current;
      if (!video) return;
      try {
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch {
        /* autoplay refused — the pointer handler below covers it */
      }
    };
    prime();
    window.addEventListener('pointerdown', prime, { once: true });
    return () => window.removeEventListener('pointerdown', prime);
  }, [videoSrc]);

  /* ---- derived motion ---------------------------------------------------- */

  const mediaScale = useTransform(progress, [0, 1], [1.06, 1]);
  const cueOpacity = useTransform(progress, [0, 0.12], [1, 0]);
  const railScale = useTransform(progress, [0, 1], [0.04, 1]);

  return (
    // No overflow-hidden on this wrapper or its ancestors — position: sticky
    // fails silently if a scroll ancestor clips.
    <div ref={wrapperRef} className="t5e-wrapper">
      <section className="t5e-stage" aria-labelledby={headlineId}>
        <motion.div style={{ scale: mediaScale }} className="t5e-media">
          {/* Poster holds the frame until the clip has been fetched into
              memory, so there is no flash of empty background. */}
          <video
            ref={videoRef}
            src={videoSrc ?? undefined}
            poster="/img/hero-poster.jpg"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="T5E — The 5 Elements, a residential development in Wagholi, Pune, at dusk"
            onLoadedMetadata={() => {
              const v = videoRef.current;
              if (!v) return;
              durationRef.current = v.duration || 4;
              setVideoReady(true);
            }}
            className={`t5e-media__video is-visible ${videoReady ? 'is-ready' : ''}`}
          />
          <div className="t5e-scrim" aria-hidden="true" />
        </motion.div>

        <header className="t5e-brandbar">
          <span className="t5e-mark">T5E</span>
          <span className="t5e-brandbar__rule" aria-hidden="true" />
          <span className="t5e-brandbar__name">The 5 Elements</span>
          <span className="t5e-brandbar__place">Wagholi, Pune</span>
        </header>

        <div className="t5e-chapters">
          {/* Opening title card. The range starts below zero so it is already
              at full opacity on the very first frame — a chapter whose fade-in
              begins at exactly 0 renders invisible until you scroll. */}
          <Chapter
            progress={progress}
            range={[-0.02, 0, 0.13, 0.22]}
            align="center"
            variant="bare"
          >
            <span className="t5e-intro__eyebrow">Wagholi, Pune</span>
            <p className="t5e-intro__title">
              The Five
              <span className="t5e-intro__title-accent">Elements</span>
            </p>
            <span className="t5e-intro__rule" aria-hidden="true" />
            <span className="t5e-intro__sub">Seven floors above the everyday</span>
          </Chapter>

          <Chapter progress={progress} range={[0.26, 0.36, 0.52, 0.62]}>
            <Pills />
            <h1 id={headlineId} className="t5e-display">
              Redefining
              <span className="t5e-display__accent">Living</span>
            </h1>
            <p className="t5e-body">
              Welcome to The 5 Elements. We develop visionary spaces where
              luxury meets sustainability, crafting environments designed in
              perfect harmony with nature to elevate your everyday life.
            </p>
          </Chapter>

          <Chapter progress={progress} range={[0.68, 0.78, 0.98, 1]} align="right">
            <span className="t5e-eyebrow">Above the seventh floor</span>
            <h2 className="t5e-display t5e-display--sm">
              A skyline
              <span className="t5e-display__accent">of your own</span>
            </h2>
            <p className="t5e-body">
              An open-air deck, a pool held against the horizon, and residences
              finished to last a generation.
            </p>
            <Actions />
          </Chapter>
        </div>

        <div className="t5e-rail" aria-hidden="true">
          <motion.span style={{ scaleY: railScale }} className="t5e-rail__fill" />
        </div>

        <motion.div style={{ opacity: cueOpacity }} className="t5e-cue" aria-hidden="true">
          <span>Scroll</span>
          <span className="t5e-cue__track">
            <span className="t5e-cue__tick" />
          </span>
        </motion.div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero — decides which of the two to mount. No scroll hooks live here.       */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const headlineId = useId();

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  if (!mounted || !isDesktop || prefersReducedMotion) {
    return (
      <MobileHero
        headlineId={headlineId}
        allowVideo={mounted && !prefersReducedMotion}
      />
    );
  }

  return <ScrubHero headlineId={headlineId} />;
}