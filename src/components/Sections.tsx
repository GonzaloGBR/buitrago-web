"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  "Muebles artesanales",
  "•",
  "Diseño atemporal",
  "•",
  "Madera noble",
  "•",
  "Hecho a mano",
  "•",
  "Carpintería de lujo",
  "•",
];

export default function MarqueeSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 38,
      ease: "none",
    });
  }, []);

  return (
    <section className="overflow-hidden border-y border-sand/35 py-12 md:py-16">
      <div
        ref={marqueeRef}
        className="flex items-center gap-8 whitespace-nowrap md:gap-12"
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className={`heading-editorial text-2xl md:text-[2.15rem] ${
              item === "•" ? "text-accent/35" : "text-charcoal/12"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.45,
          delay: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="section-editorial section-y-loose"
    >
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-24">
        <div ref={leftRef} className="opacity-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/detail-joinery.png"
              alt="Detalle de ensamblaje artesanal Buitrago"
              fill
              className="object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div ref={rightRef} className="opacity-0">
          <span className="text-label mb-7 block text-warm-gray">
            Nuestra Filosofía
          </span>

          <h2 className="heading-editorial mb-9 text-3xl leading-[1.12] text-charcoal md:text-5xl">
            La nobleza de lo hecho
            <span className="text-warm-gray"> a mano</span>
          </h2>

          <p className="text-body-elegant mb-7 max-w-md text-warm-gray">
            En Buitrago, cada pieza nace de una conversación entre la madera y
            las manos que la trabajan. No fabricamos muebles en serie —
            esculpimos legados.
          </p>

          <p className="text-body-elegant mb-12 max-w-md text-warm-gray">
            Tres generaciones de carpinteros nos respaldan. Cada ensamble, cada
            acabado, cada curva cuenta una historia de dedicación y perfección.
          </p>

          <button className="btn-editorial" type="button">
            <span>Conocer más</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
