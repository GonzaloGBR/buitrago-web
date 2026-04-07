"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import {
  createProductAction,
  updateProductAction,
  type ProductFormState,
} from "@/app/admin/actions/products";
import AdminImageField from "@/components/admin/AdminImageField";
import AdminGalleryField from "@/components/admin/AdminGalleryField";
import type { Category, Product } from "@/data/catalog";

type Props =
  | { mode: "create"; categories: Category[] }
  | { mode: "edit"; categories: Category[]; initial: Product };

function getProductFormAction(props: Props) {
  if (props.mode === "create") return createProductAction;
  return updateProductAction.bind(null, props.initial.id);
}

export default function ProductForm(props: Props) {
  const searchParams = useSearchParams();
  const ok = searchParams.get("ok");
  const initial = props.mode === "edit" ? props.initial : null;

  const [state, formAction] = useFormState(
    getProductFormAction(props),
    null as ProductFormState
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {ok ? (
        <p className="rounded-sm border border-green-200 bg-green-50 px-3 py-2 font-sans text-sm text-green-900">
          Guardado correctamente.
        </p>
      ) : null}
      {state?.error ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 font-sans text-sm text-red-800">
          {state.error}
        </p>
      ) : null}

      {props.mode === "create" ? (
        <div>
          <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            ID del producto (URL, no se puede cambiar después)
          </label>
          <input
            name="id"
            required
            pattern="[a-z0-9-]+"
            className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-mono text-sm outline-none focus:border-charcoal/40"
            placeholder="comedor-raiz-viva"
          />
        </div>
      ) : (
        <div>
          <span className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            ID
          </span>
          <code className="rounded-sm bg-charcoal/5 px-3 py-2 font-mono text-sm">
            {initial!.id}
          </code>
        </div>
      )}

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Categoría
        </label>
        <select
          name="categorySlug"
          required
          defaultValue={initial?.categorySlug}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        >
          <option value="">— Elegir —</option>
          {props.categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Nombre
        </label>
        <input
          name="name"
          required
          defaultValue={initial?.name}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            Precio
          </label>
          <input
            name="price"
            defaultValue={initial?.price}
            className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
          />
        </div>
        <div>
          <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            Dimensiones
          </label>
          <input
            name="dimensions"
            defaultValue={initial?.dimensions}
            className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            Madera
          </label>
          <input
            name="wood"
            defaultValue={initial?.wood}
            className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
          />
        </div>
        <div>
          <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            Badge madera
          </label>
          <input
            name="woodBadge"
            defaultValue={initial?.woodBadge}
            className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Descripción corta
        </label>
        <textarea
          name="shortDescription"
          rows={2}
          defaultValue={initial?.shortDescription}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Descripción larga
        </label>
        <textarea
          name="description"
          rows={6}
          defaultValue={initial?.description}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Acabado
        </label>
        <input
          name="finish"
          defaultValue={initial?.finish}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <AdminImageField
        name="image"
        label="Imagen principal"
        defaultValue={initial?.image}
        required
      />

      <AdminGalleryField defaultLines={initial?.gallery ?? []} />

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Características — una por línea
        </label>
        <textarea
          name="features"
          rows={6}
          required
          defaultValue={initial?.features.join("\n")}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <button
        type="submit"
        className="rounded-sm bg-charcoal px-6 py-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-cream hover:bg-charcoal-light"
      >
        {props.mode === "create" ? "Crear producto" : "Guardar cambios"}
      </button>
    </form>
  );
}
