"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import LogoMark, { LOGO_MARK_SIZE_CLASS } from "@/components/LogoMark";

type NavbarProps = {
  siteChromeVisible: boolean;
};

export default function Navbar({ siteChromeVisible }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        setScrolled(window.scrollY >= heroBottom - 60);
      } else {
        setScrolled(window.scrollY > 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!siteChromeVisible || !navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.15, ease: "power4.out" }
    );
  }, [siteChromeVisible]);

  const onDark = !scrolled && !menuOpen;

  return (
    <>
      <nav
        ref={navRef}
        aria-hidden={!siteChromeVisible}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          !siteChromeVisible ? "pointer-events-none invisible" : ""
        } ${scrolled ? "bg-cream/95 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-5 md:px-6">
          {/* Left — Logo */}
          <Link
            href="/"
            aria-label="Buitrago — inicio"
            className="z-10 flex h-[4.5rem] md:h-[5rem] items-center justify-center"
          >
            <LogoMark
              variant={onDark ? "on-dark" : "on-light"}
              className={LOGO_MARK_SIZE_CLASS}
            />
          </Link>

          {/* Right — Menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`group z-10 flex cursor-pointer items-center gap-3 transition-transform duration-300 ease-out hover:scale-105 ${
              menuOpen ? "" : ""
            }`}
            aria-label="Toggle menu"
          >
            <div className="flex h-7 w-7 flex-col items-center justify-center gap-[5px]">
              <span
                className={`block w-5 h-[1.2px] transition-all duration-500 ${
                  menuOpen ? "rotate-45 translate-y-[3.1px] bg-cream" : onDark ? "bg-cream" : "bg-charcoal"
                }`}
              />
              <span
                className={`block w-5 h-[1.2px] transition-all duration-500 ${
                  menuOpen ? "-rotate-45 -translate-y-[3.1px] bg-cream" : onDark ? "bg-cream" : "bg-charcoal"
                }`}
              />
            </div>
            <span
              className={`text-label transition-colors duration-500 ${
                menuOpen ? "text-cream" : onDark ? "text-cream" : "text-charcoal"
              }`}
            >
              Menu
            </span>
          </button>
        </div>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-charcoal transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          menuOpen && siteChromeVisible
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          {[
            { label: "Colección", href: "#colección" },
            { label: "Nosotros", href: "#nosotros" },
            { label: "Contacto", href: "#contacto" },
          ].map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`heading-display text-5xl text-cream transition-all duration-700 hover:text-accent md:text-7xl ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${300 + i * 100}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="absolute bottom-12 flex gap-12">
          <a
            href="mailto:hola@buitrago.com"
            className="text-label text-warm-gray hover:text-cream transition-colors duration-500"
          >
            hola@buitrago.com
          </a>
          <a
            href="#"
            className="text-label text-warm-gray hover:text-cream transition-colors duration-500"
          >
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
