"use client";

import { deleteProductAction } from "@/app/admin/actions/products";

export default function DeleteProductForm({ productId }: { productId: string }) {
  return (
    <form
      action={deleteProductAction.bind(null, productId)}
      onSubmit={(e) => {
        if (!confirm("¿Eliminar este producto?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="font-sans text-xs text-red-700 underline hover:text-red-900"
      >
        Eliminar
      </button>
    </form>
  );
}
