"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isValidProductId } from "@/lib/slug";
import { assertAdmin } from "@/app/admin/actions/guard";

function parseFeatures(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseGallery(raw: string): string[] {
  const lines = raw.split(/\r?\n/).flatMap((l) => l.split(","));
  return lines.map((s) => s.trim()).filter(Boolean);
}

export type ProductFormState = { error?: string } | null;

export async function createProductAction(
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "").trim().toLowerCase();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const wood = String(formData.get("wood") ?? "").trim();
  const woodBadge = String(formData.get("woodBadge") ?? "").trim();
  const dimensions = String(formData.get("dimensions") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const finish = String(formData.get("finish") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const features = parseFeatures(String(formData.get("features") ?? ""));
  const gallery = parseGallery(String(formData.get("gallery") ?? ""));

  if (!isValidProductId(id)) {
    return { error: "ID inválido (minúsculas, números y guiones)." };
  }
  if (!categorySlug || !name || !image || gallery.length === 0) {
    return { error: "Categoría, nombre, imagen principal y al menos una imagen de galería son obligatorios." };
  }
  if (features.length === 0) {
    return { error: "Añade al menos una característica (una por línea)." };
  }

  try {
    await prisma.product.create({
      data: {
        id,
        categorySlug,
        name,
        price: price || "—",
        wood: wood || "—",
        woodBadge: woodBadge || "—",
        dimensions: dimensions || "—",
        shortDescription: shortDescription || "—",
        description: description || "—",
        finish: finish || "—",
        image,
        features,
        gallery,
      },
    });
  } catch {
    return { error: "No se pudo crear (¿ID duplicado o categoría inexistente?)." };
  }
  revalidatePath("/");
  revalidatePath(`/categoria/${categorySlug}`);
  revalidatePath(`/categoria/${categorySlug}/${id}`);
  redirect(`/admin/products/${id}/edit?ok=1`);
}

export async function updateProductAction(
  productId: string,
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await assertAdmin();
  const categorySlug = String(formData.get("categorySlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const wood = String(formData.get("wood") ?? "").trim();
  const woodBadge = String(formData.get("woodBadge") ?? "").trim();
  const dimensions = String(formData.get("dimensions") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const finish = String(formData.get("finish") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const features = parseFeatures(String(formData.get("features") ?? ""));
  const gallery = parseGallery(String(formData.get("gallery") ?? ""));

  if (!categorySlug || !name || !image || gallery.length === 0) {
    return { error: "Categoría, nombre, imagen y galería son obligatorios." };
  }
  if (features.length === 0) {
    return { error: "Añade al menos una característica." };
  }

  let old: { categorySlug: string } | null = null;
  try {
    old = await prisma.product.findUnique({
      where: { id: productId },
      select: { categorySlug: true },
    });
    await prisma.product.update({
      where: { id: productId },
      data: {
        categorySlug,
        name,
        price: price || "—",
        wood: wood || "—",
        woodBadge: woodBadge || "—",
        dimensions: dimensions || "—",
        shortDescription: shortDescription || "—",
        description: description || "—",
        finish: finish || "—",
        image,
        features,
        gallery,
      },
    });
  } catch {
    return { error: "No se pudo guardar." };
  }
  revalidatePath("/");
  if (old) {
    revalidatePath(`/categoria/${old.categorySlug}`);
    revalidatePath(`/categoria/${old.categorySlug}/${productId}`);
  }
  revalidatePath(`/categoria/${categorySlug}`);
  revalidatePath(`/categoria/${categorySlug}/${productId}`);
  redirect(`/admin/products/${productId}/edit?ok=1`);
}

export async function deleteProductAction(
  productId: string,
  _formData?: FormData
): Promise<void> {
  await assertAdmin();
  let slug: string | null = null;
  try {
    const p = await prisma.product.findUnique({
      where: { id: productId },
      select: { categorySlug: true },
    });
    slug = p?.categorySlug ?? null;
    await prisma.product.delete({ where: { id: productId } });
  } catch {
    redirect("/admin/products?error=delete");
  }
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/categoria/${slug}`);
  }
  redirect("/admin/products?deleted=1");
}
