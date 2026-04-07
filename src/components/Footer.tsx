"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 92%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-charcoal border-t border-warm-gray/10 py-8 opacity-0"
    >
      <div className="section-editorial flex flex-col items-center justify-between gap-6 md:flex-row">
        <span className="heading-editorial text-lg text-cream/40">
          Buitrago
        </span>
        <p className="text-label text-warm-gray/40 text-[9px] tracking-[0.3em]">
          © {new Date().getFullYear()} Buitrago — Carpintería Artesanal
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-label text-warm-gray/40 text-[9px] hover:text-cream/60 transition-colors duration-500"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="text-label text-warm-gray/40 text-[9px] hover:text-cream/60 transition-colors duration-500"
          >
            Términos
          </a>
        </div>
      </div>
    </footer>
  );
}
