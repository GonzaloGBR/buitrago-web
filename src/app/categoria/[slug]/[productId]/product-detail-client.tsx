"use client";

import { useEffect, useState } from "react";
import CatalogImage from "@/components/CatalogImage";
import Link from "next/link";
import type { Category, Product } from "@/data/catalog";

type Props = {
  slug: string;
  product: Product;
  category: Category;
  similarProducts: Product[];
};

export default function ProductDetailClient({
  slug,
  product,
  category,
  similarProducts,
}: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (showShare) {
      const t = setTimeout(() => setShowShare(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showShare]);

  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa cotizar "${product.name}" (${product.wood}, ${product.dimensions}). ¿Podrían darme más información?`
  );
  const whatsappUrl = `https://wa.me/5491100000000?text=${whatsappMessage}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowShare(true);
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      <div className="section-editorial pt-6 pb-2">
        <Link
          href={`/categoria/${slug}`}
          className="inline-flex items-center gap-2.5 font-sans text-[0.8rem] text-charcoal/60 no-underline transition-colors hover:text-charcoal"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-[0.85rem]">
            ‹
          </span>
          Volver a {category.name}
        </Link>

        <nav className="mt-3 font-sans text-[0.7rem] text-warm-gray">
          <Link href="/" className="no-underline hover:text-charcoal transition-colors">Inicio</Link>
          <span className="mx-1.5">/</span>
          <Link href="/#categorías" className="no-underline hover:text-charcoal transition-colors">Categorías</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/categoria/${slug}`} className="no-underline hover:text-charcoal transition-colors">{category.name}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      <section className="section-editorial pt-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[5.5rem_1fr_1fr] md:gap-6 lg:gap-10">
          <div className="hidden flex-col gap-2.5 md:flex">
            {product.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square w-full cursor-pointer overflow-hidden bg-cream-dark transition-all duration-300 ${
                  activeImg === i
                    ? "ring-2 ring-charcoal/50 ring-offset-2 ring-offset-cream"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <CatalogImage
                  src={src}
                  alt={`${product.name} miniatura ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
            <CatalogImage
              src={product.gallery[activeImg]}
              alt={`${product.name} — vista principal`}
              fill
              className="object-cover transition-opacity duration-500"
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <span className="absolute left-4 top-4 rounded-sm bg-charcoal/80 px-3 py-1.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.15em] text-cream/95 backdrop-blur-sm">
              {product.woodBadge}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto md:hidden">
            {product.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden bg-cream-dark transition-all duration-300 ${
                  activeImg === i
                    ? "ring-2 ring-charcoal/50 ring-offset-1 ring-offset-cream"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <CatalogImage
                  src={src}
                  alt={`${product.name} miniatura ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>

          <div className="md:sticky md:top-28">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-label text-warm-gray">{category.name.toUpperCase()}</span>
              <span className="h-[1px] w-6 bg-charcoal/30" />
            </div>

            <h1 className="heading-editorial text-3xl text-charcoal md:text-4xl lg:text-[2.6rem]">
              {product.name}
            </h1>

            <p className="heading-editorial mt-3 text-2xl text-charcoal/70 md:text-[1.65rem]">
              {product.price}
            </p>

            <p className="text-body-elegant mt-6 text-warm-gray text-[0.88rem] leading-[1.7]">
              {product.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 border-y border-sand/40 py-6">
              <div>
                <span className="text-label mb-2 block text-warm-gray">Dimensiones</span>
                <div className="flex items-center gap-2 font-sans text-[0.82rem] text-charcoal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-warm-gray">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  {product.dimensions}
                </div>
              </div>
              <div>
                <span className="text-label mb-2 block text-warm-gray">Acabado</span>
                <p className="font-sans text-[0.82rem] text-charcoal leading-snug">
                  {product.finish}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-label mb-4 block text-warm-gray">Características destacadas</span>
              <ul className="space-y-2.5">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-sans text-[0.82rem] text-charcoal/80">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0 text-gold">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2.5 bg-charcoal px-6 py-4 font-sans text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cream no-underline transition-colors duration-300 hover:bg-charcoal-light"
              >
                Comprar por WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex cursor-pointer items-center justify-center gap-2 border border-charcoal/20 bg-transparent px-6 py-4 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-charcoal/70 transition-colors duration-300 hover:border-charcoal hover:text-charcoal"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
                </svg>
                {showShare ? "Enlace copiado" : "Compartir"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {similarProducts.length > 0 && (
        <section className="section-editorial border-t border-sand/30 pb-20 pt-14 md:pb-28">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-label mb-2 block text-warm-gray">Descubre más</span>
              <h2 className="heading-editorial text-2xl text-charcoal md:text-3xl">
                Productos Similares
              </h2>
            </div>
            <Link
              href={`/categoria/${slug}`}
              className="hidden items-center gap-1.5 font-serif text-sm italic text-gold no-underline transition-colors hover:text-gold-dark md:inline-flex"
            >
              Ver colección completa →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7">
            {similarProducts.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/categoria/${slug}/${p.id}`}
                className="group block no-underline"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                  <CatalogImage
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-charcoal/80 px-3 py-1.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.15em] text-cream/95 backdrop-blur-sm">
                    {p.woodBadge}
                  </span>
                </div>
                <h3 className="heading-editorial mt-4 text-lg text-charcoal">{p.name}</h3>
                <p className="mt-1 font-serif text-base text-charcoal/70">{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
