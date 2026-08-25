'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import './Videoshowcase.css';

const VIDEO_ID = 'uR4dbOCN2s4';
const START_AT = 21;

/* Silent, controlless, looping — a moving backdrop rather than a video player. */
const AMBIENT_SRC =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0` +
  `&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&start=${START_AT}`;

/* Sound, controls, full attention. */
const CINEMA_SRC =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1&start=${START_AT}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [ambient, setAmbient] = useState(false);
  const [cinema, setCinema] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  /* ---- gentle parallax on the backdrop ---------------------------------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const backdropScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  /* ---- load the ambient loop only when the section is actually seen ------ */

  useEffect(() => {
    if (prefersReducedMotion) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /2g|slow-2g|3g/.test(conn.effectiveType)) return;

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAmbient(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  /* ---- cinema mode ------------------------------------------------------- */

  const openCinema = useCallback(() => setCinema(true), []);
  const closeCinema = useCallback(() => setCinema(false), []);

  useEffect(() => {
    if (!cinema) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCinema();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cinema, closeCinema]);

  return (
    <section ref={sectionRef} className="vs" aria-labelledby="vs-heading">
      {/* ---- backdrop ------------------------------------------------------ */}

      <motion.div
        className="vs__backdrop"
        style={prefersReducedMotion ? undefined : { y: backdropY, scale: backdropScale }}
        aria-hidden="true"
      >
        {/* Poster carries the frame until the ambient loop is ready, and stays
            put entirely on reduced-motion or a slow connection. */}
        <img
          src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
          alt=""
          className="vs__poster"
          loading="lazy"
          decoding="async"
        />

        {ambient && (
          <div className={`vs__ambient ${cinema ? 'is-hidden' : ''}`}>
            <iframe
              src={AMBIENT_SRC}
              title=""
              tabIndex={-1}
              aria-hidden="true"
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          </div>
        )}

        <div className="vs__scrim" />
        <div className="vs__vignette" />
      </motion.div>

      {/* ---- overlay content ----------------------------------------------- */}

      <motion.div
        className={`vs__content ${cinema ? 'is-hidden' : ''}`}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={fadeUp} className="vs__eyebrow">
          <span className="vs__rule" aria-hidden="true" />
          The Signature Collection
        </motion.div>

        <motion.h2 variants={fadeUp} id="vs-heading" className="vs__heading">
          Experience
          <span className="vs__heading-accent">true elegance</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="vs__body">
          Step inside our most exclusive developments — where modern
          architectural brilliance meets the tranquil elements of nature.
        </motion.p>

        <motion.div variants={fadeUp} className="vs__actions">
          <button type="button" onClick={openCinema} className="vs__play">
            <span className="vs__play-ring" aria-hidden="true" />
            <span className="vs__play-icon" aria-hidden="true" />
            <span className="vs__play-label">Watch the film</span>
          </button>

          <a href="#gallery" className="vs__link">
            View full gallery
          </a>
        </motion.div>
      </motion.div>

      {/* ---- corner marks -------------------------------------------------- */}

      <span className="vs__mark vs__mark--tl" aria-hidden="true" />
      <span className="vs__mark vs__mark--br" aria-hidden="true" />

      {/* ---- cinema mode ---------------------------------------------------- */}

      {cinema && (
        <div className="vs__cinema" role="dialog" aria-modal="true" aria-label="T5E Signature Collection film">
          <button
            type="button"
            onClick={closeCinema}
            className="vs__close"
            aria-label="Close video"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div className="vs__cinema-frame">
            <iframe
              src={CINEMA_SRC}
              title="T5E Signature Collection"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </section>
  );
}