import type { Category as DbCategory, Product as DbProduct } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { normalizeGallery, normalizeImageSrc } from "@/lib/image-url";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  categorySlug: string;
  price: string;
  wood: string;
  woodBadge: string;
  dimensions: string;
  shortDescription: string;
  description: string;
  finish: string;
  features: string[];
  image: string;
  gallery: string[];
};

function mapCategory(c: DbCategory): Category {
  return {
    slug: c.slug,
    name: c.name,
    tagline: c.tagline,
    description: c.description,
    image: normalizeImageSrc(c.image) || c.image,
  };
}

function mapProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    categorySlug: p.categorySlug,
    price: p.price,
    wood: p.wood,
    woodBadge: p.woodBadge,
    dimensions: p.dimensions,
    shortDescription: p.shortDescription,
    description: p.description,
    finish: p.finish,
    features: Array.isArray(p.features) ? (p.features as string[]) : [],
    gallery: normalizeGallery(p.gallery as unknown[]),
    image: normalizeImageSrc(p.image) || p.image,
  };
}

export async function getCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({ orderBy: { slug: "asc" } });
  return rows.map(mapCategory);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const c = await prisma.category.findUnique({ where: { slug } });
  return c ? mapCategory(c) : null;
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { categorySlug: slug },
    orderBy: { name: "asc" },
  });
  return rows.map(mapProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({ where: { id } });
  return p ? mapProduct(p) : null;
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: [{ categorySlug: "asc" }, { name: "asc" }],
  });
  return rows.map(mapProduct);
}

export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  const rows = await prisma.category.findMany({ select: { slug: true } });
  return rows;
}

export type FeaturedHomeItem = {
  position: number;
  productId: string;
  categorySlug: string;
  name: string;
  price: string;
  image: string;
  href: string;
};

function featuredItemFromProduct(p: DbProduct, position: number): FeaturedHomeItem {
  const prod = mapProduct(p);
  return {
    position,
    productId: prod.id,
    categorySlug: prod.categorySlug,
    name: prod.name,
    price: prod.price,
    image: prod.image,
    href: `/categoria/${prod.categorySlug}/${prod.id}`,
  };
}

/** Piezas destacadas del home (máx. 4). Completa con otros productos si faltan filas en BD. */
export async function getFeaturedHomeProducts(): Promise<FeaturedHomeItem[]> {
  let rows: Awaited<
    ReturnType<
      typeof prisma.featuredProduct.findMany<{ include: { product: true } }>
    >
  > = [];
  try {
    rows = await prisma.featuredProduct.findMany({
      orderBy: { position: "asc" },
      include: { product: true },
    });
  } catch {
    /* Tabla aún no existe: ejecutá `npx prisma db push` (o migrate). */
  }
  const mapped: FeaturedHomeItem[] = rows
    .filter((r) => r.product)
    .map((r) => featuredItemFromProduct(r.product, r.position));

  if (mapped.length >= 4) {
    return mapped.slice(0, 4);
  }

  const used = new Set(mapped.map((m) => m.productId));
  const need = 4 - mapped.length;
  const extras = await prisma.product.findMany({
    ...(used.size > 0 ? { where: { id: { notIn: [...used] } } } : {}),
    orderBy: [{ categorySlug: "asc" }, { name: "asc" }],
    take: need,
  });

  let nextPos = mapped.length + 1;
  for (const row of extras) {
    mapped.push(featuredItemFromProduct(row, nextPos));
    nextPos += 1;
  }

  return mapped.slice(0, 4);
}

export async function getFeaturedProductIds(): Promise<
  { position: number; productId: string }[]
> {
  try {
    return await prisma.featuredProduct.findMany({
      orderBy: { position: "asc" },
      select: { position: true, productId: true },
    });
  } catch {
    return [];
  }
}
