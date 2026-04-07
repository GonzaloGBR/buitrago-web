import Link from "next/link";
import { Suspense } from "react";
import { getCategories } from "@/data/catalog";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="font-sans text-sm text-warm-gray hover:text-charcoal"
        >
          ← Volver a productos
        </Link>
        <h1 className="mt-4 font-serif text-3xl text-charcoal">
          Nuevo producto
        </h1>
      </div>
      {categories.length === 0 ? (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-950">
          Primero tenés que crear al menos una{" "}
          <Link href="/admin/categories/new" className="underline">
            categoría
          </Link>
          .
        </p>
      ) : (
        <Suspense fallback={<p className="font-sans text-sm text-warm-gray">Cargando formulario…</p>}>
          <ProductForm mode="create" categories={categories} />
        </Suspense>
      )}
    </div>
  );
}
