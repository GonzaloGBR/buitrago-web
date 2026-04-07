"use client";

import { useState, useCallback, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroOverlay from "@/components/IntroOverlay";
import MoodboardOverlay from "@/components/MoodboardOverlay";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection, { PhilosophySection } from "@/components/Sections";
import FeaturedProducts from "@/components/CollectionGrid";
import CategoriesSection from "@/components/CategoriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import type { Category } from "@/data/catalog";

type Props = {
  categories: Category[];
};

export default function HomeClient({ categories }: Props) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [moodboardDone, setMoodboardDone] = useState(false);
  const [siteChromeVisible, setSiteChromeVisible] = useState(false);

  const handleIntroEnd = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  const handleMoodboardEnd = useCallback(() => {
    setMoodboardDone(true);
  }, []);

  const handleHeroReady = useCallback(() => {
    setSiteChromeVisible(true);
  }, []);

  useEffect(() => {
    if (!siteChromeVisible) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [siteChromeVisible]);

  useEffect(() => {
    if (!siteChromeVisible) {
      const lock = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };
      const resetPos = () => window.scrollTo(0, 0);

      window.addEventListener("wheel", lock, { passive: false, capture: true });
      window.addEventListener("touchmove", lock, { passive: false, capture: true });
      window.addEventListener("scroll", resetPos, { passive: true });

      return () => {
        window.removeEventListener("wheel", lock, true);
        window.removeEventListener("touchmove", lock, true);
        window.removeEventListener("scroll", resetPos);
      };
    }
  }, [siteChromeVisible]);

  useEffect(() => {
    if (!siteChromeVisible) return;
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [siteChromeVisible]);

  return (
    <>
      {!preloaderDone && <IntroOverlay onComplete={handleIntroEnd} />}

      {!moodboardDone && (
        <MoodboardOverlay
          startAnimation={preloaderDone}
          onComplete={handleMoodboardEnd}
        />
      )}

      <Navbar siteChromeVisible={siteChromeVisible} />

      <main>
        <Hero animateIn={moodboardDone} onHeroReady={handleHeroReady} />

        {siteChromeVisible && (
          <>
            <MarqueeSection />
            <PhilosophySection />
            <FeaturedProducts />
            <CategoriesSection categories={categories} />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}
      </main>

      {siteChromeVisible && <Footer />}
    </>
  );
}
