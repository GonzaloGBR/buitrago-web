import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategory, getProductsByCategory } from "@/data/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = await getCategory(slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — Buitrago`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const items = await getProductsByCategory(slug);

  return (
    <main className="min-h-screen bg-cream">
      {/* ── Back + Breadcrumb ── */}
      <div className="section-editorial pt-6 pb-2">
        <Link
          href="/#categorías"
          className="inline-flex items-center gap-2.5 font-sans text-[0.8rem] text-charcoal/60 no-underline transition-colors hover:text-charcoal"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-[0.85rem]">
            ‹
          </span>
          Volver al inicio
        </Link>

        <nav className="mt-3 font-sans text-[0.7rem] text-warm-gray">
          <Link href="/" className="no-underline hover:text-charcoal transition-colors">Inicio</Link>
          <span className="mx-1.5">/</span>
          <Link href="/#categorías" className="no-underline hover:text-charcoal transition-colors">Categorías</Link>
          <span className="mx-1.5">/</span>
          <span className="text-charcoal">{category.name}</span>
        </nav>
      </div>

      {/* ── Hero split: info left + image right ── */}
      <section className="section-editorial pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[1px] w-6 bg-charcoal/30" />
              <span className="text-label text-warm-gray">Catálogo</span>
            </div>
            <h1 className="heading-display text-[clamp(2.8rem,6vw,5rem)] text-charcoal">
              {category.name}
            </h1>
            <p className="text-body-elegant mt-4 max-w-md text-warm-gray">
              {category.tagline}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-cream-dark">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Product grid ── */}
      <section className="section-editorial pb-24 md:pb-36">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {items.map((product) => (
            <Link
              key={product.id}
              href={`/categoria/${slug}/${product.id}`}
              className="group block no-underline"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                {/* Wood badge */}
                <span className="absolute left-3 top-3 rounded-sm bg-charcoal/80 px-3 py-1.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.15em] text-cream/95 backdrop-blur-sm">
                  {product.woodBadge}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="heading-editorial text-lg text-charcoal md:text-xl">
                  {product.name}
                </h3>
                <p className="mt-1.5 font-sans text-[0.75rem] leading-relaxed text-warm-gray line-clamp-2">
                  {product.shortDescription}
                </p>

                <div className="mt-3 flex items-center gap-1.5 font-sans text-[0.72rem] text-charcoal/55">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  {product.dimensions}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-xl text-charcoal md:text-[1.35rem]">
                    {product.price}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-sm border border-charcoal/20 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-[0.18em] text-charcoal/70 transition-all duration-300 group-hover:border-charcoal group-hover:text-charcoal">
                    Consultar
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
