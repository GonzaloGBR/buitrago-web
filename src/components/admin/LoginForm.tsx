"use client";

import { useFormState } from "react-dom";
import {
  loginAction,
  type LoginState,
} from "@/app/admin/actions/auth";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, null as LoginState);

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-6 rounded-sm border border-charcoal/10 bg-cream p-8 shadow-sm">
      <h1 className="font-serif text-2xl text-charcoal">Acceso administración</h1>
      <p className="font-sans text-sm text-warm-gray">
        Introduce la contraseña configurada en el servidor.
      </p>
      <div>
        <label htmlFor="password" className="mb-2 block text-[0.7rem] uppercase tracking-[0.12em] text-warm-gray">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-sans text-sm outline-none focus:border-charcoal/40"
        />
      </div>
      {state?.error ? (
        <p className="font-sans text-sm text-red-700">{state.error}</p>
      ) : null}
      <button
        type="submit"
        className="w-full rounded-sm bg-charcoal py-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-cream hover:bg-charcoal-light"
      >
        Entrar
      </button>
    </form>
  );
}
