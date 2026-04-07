import Link from "next/link";
import { logoutAction } from "@/app/admin/actions/auth";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <header className="border-b border-charcoal/10 bg-cream px-6 py-4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <Link href="/admin" className="font-serif text-lg text-charcoal">
            Buitrago — Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-5 text-sm text-charcoal/80">
            <Link href="/admin" className="hover:text-charcoal">
              Inicio
            </Link>
            <Link href="/admin/categories" className="hover:text-charcoal">
              Categorías
            </Link>
            <Link href="/admin/products" className="hover:text-charcoal">
              Productos
            </Link>
            <Link href="/" className="text-warm-gray hover:text-charcoal">
              Ver sitio
            </Link>
            <form action={logoutAction} className="inline">
              <button
                type="submit"
                className="text-warm-gray hover:text-charcoal"
              >
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
