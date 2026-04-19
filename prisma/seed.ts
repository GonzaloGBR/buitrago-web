import { PrismaClient } from "@prisma/client";
import { categories, products } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        image: c.image,
      },
      update: {
        name: c.name,
        tagline: c.tagline,
        description: c.description,
        image: c.image,
      },
    });
  }

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        categorySlug: p.categorySlug,
        name: p.name,
        price: p.price,
        wood: p.wood,
        woodBadge: p.woodBadge,
        dimensions: p.dimensions,
        shortDescription: p.shortDescription,
        description: p.description,
        finish: p.finish,
        image: p.image,
        features: p.features,
        gallery: p.gallery,
      },
      update: {
        categorySlug: p.categorySlug,
        name: p.name,
        price: p.price,
        wood: p.wood,
        woodBadge: p.woodBadge,
        dimensions: p.dimensions,
        shortDescription: p.shortDescription,
        description: p.description,
        finish: p.finish,
        image: p.image,
        features: p.features,
        gallery: p.gallery,
      },
    });
  }

  const featuredDefaults = [
    { position: 1, productId: "comedor-raiz-viva" },
    { position: 2, productId: "ratona-brasa" },
    { position: 3, productId: "estante-linea" },
    { position: 4, productId: "comedor-paramo" },
  ] as const;
  for (const row of featuredDefaults) {
    await prisma.featuredProduct.upsert({
      where: { position: row.position },
      create: { position: row.position, productId: row.productId },
      update: { productId: row.productId },
    });
  }
}

main()
  .then(() => {
    console.log("Seed OK");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
