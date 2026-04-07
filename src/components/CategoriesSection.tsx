"use client";

import { useEffect, useRef } from "react";
import CatalogImage from "@/components/CatalogImage";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Category } from "@/data/catalog";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  categories: Category[];
};

export default function CategoriesSection({ categories }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const imgEl = card.querySelector(".cat-img");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });

        tl.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.35,
            delay: i * 0.06,
            ease: "power3.inOut",
          }
        );

        if (imgEl) {
          tl.fromTo(
            imgEl,
            { scale: 1.15 },
            { scale: 1, duration: 1.55, ease: "power2.out" },
            "-=1.05"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categorías"
      className="section-editorial section-y-loose"
    >
      <div className="mb-12 md:mb-16">
        <span className="text-label mb-5 block text-warm-gray">
          Categorías
        </span>
        <h2
          ref={titleRef}
          className="heading-editorial text-4xl text-charcoal opacity-0 md:text-5xl"
        >
          Explora por
          <br />
          <span className="text-warm-gray">tipo de pieza</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={`/categoria/${cat.slug}`}
            className="group block no-underline"
          >
            <div
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                <CatalogImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="cat-img object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4 md:px-5 md:pb-5">
                  <h3 className="heading-editorial text-base leading-tight text-cream md:text-lg">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
