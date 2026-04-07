import Link from "next/link";
import LogoMark from "@/components/LogoMark";

export default function CategoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-sand/30 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" aria-label="Buitrago — inicio">
            <LogoMark
              variant="on-light"
              className="h-[3.5rem] w-[min(14rem,45vw)] md:h-[4rem] md:w-[17rem] transition-[background-color] duration-500"
            />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-label text-charcoal/70 no-underline transition-colors hover:text-charcoal">
              Inicio
            </Link>
            <Link href="/#categorías" className="text-label text-charcoal/70 no-underline transition-colors hover:text-charcoal">
              Muebles
            </Link>
            <Link href="/#contacto" className="text-label text-charcoal/70 no-underline transition-colors hover:text-charcoal">
              Contacto
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
