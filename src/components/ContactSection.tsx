"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          delay: 0.18,
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
      id="contacto"
      className="relative overflow-hidden bg-charcoal py-36 text-cream md:py-52"
    >
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(247,245,240,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="section-editorial relative text-center">
        <span className="text-label text-warm-gray block mb-8">
          Hablemos de tu proyecto
        </span>

        <h2
          ref={titleRef}
          className="heading-display text-[clamp(2.5rem,6vw,7rem)] text-cream mb-8 opacity-0"
        >
          Creemos algo
          <br />
          <span className="text-accent">extraordinario</span>
        </h2>

        <div ref={contentRef} className="opacity-0">
          <p className="text-body-elegant text-warm-gray-light max-w-lg mx-auto mb-12">
            Cada proyecto comienza con una idea. Cuéntanos la tuya y juntos la
            transformaremos en una pieza que perdure por generaciones.
          </p>

          <button className="btn-editorial-light">
            <span>Iniciar Conversación</span>
            <span>→</span>
          </button>

          {/* Contact Details */}
          <div className="mt-20 pt-12 border-t border-warm-gray/20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-label text-warm-gray mb-3">Visítanos</p>
              <p className="text-body-elegant text-cream/80 text-sm">
                Av. del Libertador 1250
                <br />
                Buenos Aires, Argentina
              </p>
            </div>
            <div>
              <p className="text-label text-warm-gray mb-3">Escríbenos</p>
              <a
                href="mailto:hola@buitrago.com"
                className="text-body-elegant text-sm text-cream/80 transition-colors duration-500 hover:text-accent"
              >
                hola@buitrago.com
              </a>
            </div>
            <div>
              <p className="text-label text-warm-gray mb-3">Síguenos</p>
              <div className="flex justify-center md:justify-start gap-6">
                {["Instagram", "Pinterest"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-label text-cream/80 transition-colors duration-500 hover:text-accent"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
