"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LogoMark from "@/components/LogoMark";
import { MOODBOARD_ITEMS } from "@/components/MoodboardOverlay";

type IntroOverlayProps = {
  onComplete: () => void;
};

/**
 * Activos críticos a tener en caché antes de soltar el contador al 100%:
 *  - Hero (la primera imagen full-bleed visible al terminar la animación).
 *  - Todas las imágenes del moodboard (vienen del propio componente para evitar duplicar la lista).
 *  - Logo (se pinta como máscara, lo cargamos para no ver el rectángulo de fondo durante el primer paint).
 *
 * Deduplicado con `Set` por si el moodboard reutiliza alguna imagen del hero a futuro.
 */
const PRELOAD_IMAGES: string[] = Array.from(
  new Set<string>([
    "/hero-dining-room-hd.jpg",
    ...MOODBOARD_ITEMS.map((m) => m.src),
    "/logo-b-mark.png",
  ])
);

function preloadImages(
  urls: string[],
  onProgress: (pct: number) => void
): Promise<void> {
  let loaded = 0;
  const total = urls.length;

  return new Promise((resolve) => {
    if (total === 0) {
      onProgress(100);
      resolve();
      return;
    }

    urls.forEach((url) => {
      const img = new window.Image();
      const done = () => {
        loaded++;
        onProgress(Math.round((loaded / total) * 100));
        if (loaded >= total) resolve();
      };
      img.onload = done;
      img.onerror = done;
      img.src = url;
    });
  });
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [loadDone, setLoadDone] = useState(false);
  const displayPct = useRef(0);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    gsap.set(logo, { opacity: 0, y: 12 });
    gsap.to(logo, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.15 });

    let targetPct = 0;

    const ticker = gsap.ticker.add(() => {
      if (displayPct.current < targetPct) {
        displayPct.current = Math.min(displayPct.current + 1.5, targetPct);
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(displayPct.current) + "%";
        }
      }
    });

    preloadImages(PRELOAD_IMAGES, (pct) => {
      targetPct = pct;
    }).then(() => {
      targetPct = 100;
      const waitForDisplay = setInterval(() => {
        if (displayPct.current >= 99) {
          clearInterval(waitForDisplay);
          setLoadDone(true);
        }
      }, 50);
    });

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, []);

  useEffect(() => {
    if (!loadDone) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.3,
      onComplete,
    });
  }, [loadDone, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
    >
      <span ref={logoRef} className="block opacity-0">
        <LogoMark
          variant="on-light"
          className="h-[4rem] w-[min(16rem,65vw)] sm:h-[5rem] sm:w-[20rem] md:h-[5.5rem] md:w-[24rem]"
          src="/logo-b-mark.png"
        />
      </span>

      <span
        ref={counterRef}
        className="mt-5 block font-sans text-[0.72rem] tracking-[0.3em] text-charcoal/40"
      >
        0%
      </span>
    </div>
  );
}
