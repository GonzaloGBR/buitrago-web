"use client";

import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import {
  createCategoryAction,
  updateCategoryAction,
  type CategoryFormState,
} from "@/app/admin/actions/categories";
import AdminImageField from "@/components/admin/AdminImageField";

type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

type Props =
  | { mode: "create" }
  | { mode: "edit"; initial: Category };

export default function CategoryForm(props: Props) {
  const searchParams = useSearchParams();
  const ok = searchParams.get("ok");

  const [state, formAction] = useFormState(
    props.mode === "create"
      ? createCategoryAction
      : updateCategoryAction.bind(null, props.initial.slug),
    null as CategoryFormState
  );

  const initial = props.mode === "edit" ? props.initial : null;

  return (
    <form action={formAction} className="max-w-xl space-y-6">
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
            Slug (URL) — no se puede cambiar después
          </label>
          <input
            name="slug"
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-mono text-sm outline-none focus:border-charcoal/40"
            placeholder="mesas-de-comedor"
          />
        </div>
      ) : (
        <div>
          <span className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
            Slug (solo lectura)
          </span>
          <code className="rounded-sm bg-charcoal/5 px-3 py-2 font-mono text-sm text-charcoal">
            {initial!.slug}
          </code>
        </div>
      )}

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

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Tagline
        </label>
        <input
          name="tagline"
          defaultValue={initial?.tagline}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <div>
        <label className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Descripción
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initial?.description}
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>

      <AdminImageField
        name="image"
        label="Imagen (ruta o sube archivo)"
        defaultValue={initial?.image}
        required
      />

      <button
        type="submit"
        className="rounded-sm bg-charcoal px-6 py-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-cream hover:bg-charcoal-light"
      >
        {props.mode === "create" ? "Crear categoría" : "Guardar cambios"}
      </button>
    </form>
  );
}
