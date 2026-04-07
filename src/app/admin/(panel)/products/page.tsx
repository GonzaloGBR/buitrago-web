import Link from "next/link";
import { getAllProducts } from "@/data/catalog";
import DeleteProductForm from "@/components/admin/DeleteProductForm";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string; error?: string }>;
}) {
  const { deleted, error } = await searchParams;
  const products = await getAllProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">Productos</h1>
          <p className="mt-1 font-sans text-sm text-warm-gray">
            {products.length} producto(s)
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-sm bg-charcoal px-4 py-2.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.15em] text-cream hover:bg-charcoal-light"
        >
          Nuevo producto
        </Link>
      </div>

      {deleted ? (
        <p className="rounded-sm border border-green-200 bg-green-50 px-3 py-2 font-sans text-sm text-green-900">
          Producto eliminado.
        </p>
      ) : null}
      {error === "delete" ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 font-sans text-sm text-red-800">
          No se pudo eliminar.
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-sm border border-charcoal/10 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-charcoal/10 bg-cream/80 font-sans text-[0.65rem] uppercase tracking-[0.12em] text-warm-gray">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {products.map((p) => (
              <tr key={p.id} className="font-sans text-charcoal">
                <td className="max-w-[140px] truncate px-4 py-3 font-mono text-xs">
                  {p.id}
                </td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-warm-gray">
                  {p.categorySlug}
                </td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="mr-4 text-gold hover:text-gold-dark"
                  >
                    Editar
                  </Link>
                  <DeleteProductForm productId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 ? (
          <p className="px-4 py-8 text-center font-sans text-sm text-warm-gray">
            No hay productos. Creá el primero o ejecutá el seed.
          </p>
        ) : null}
      </div>
    </div>
  );
}
