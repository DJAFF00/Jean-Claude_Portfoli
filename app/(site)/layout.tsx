import Link from "next/link";
import Mark from "@/components/Mark";
import ContactBar from "@/components/ContactBar";
import ContactForm from "@/components/ContactForm";
import { getProfile } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <>
      <header className="sticky top-0 z-30 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <Mark /> <span className="hidden sm:inline">Houessou<span className="font-light">.dev</span></span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-paper/10 bg-ink/60 px-2 py-1.5 text-xs font-medium text-paper/80 backdrop-blur-md sm:text-sm">
          <Link href="/" className="rounded-full px-3 py-1.5 hover:bg-paper/10 hover:text-lime sm:px-4">Accueil</Link>
          <Link href="/projets" className="rounded-full px-3 py-1.5 hover:bg-paper/10 hover:text-lime sm:px-4">Projets</Link>
          <Link href="/#parcours" className="rounded-full px-3 py-1.5 hover:bg-paper/10 hover:text-lime sm:px-4">Parcours</Link>
          <Link href="/#contact" className="rounded-full px-3 py-1.5 hover:bg-paper/10 hover:text-lime sm:px-4">Contact</Link>
        </nav>
        <Link href="/#contact" className="btn btn-lime hidden !px-5 !py-2 text-sm md:inline-block">Parlons-en</Link>
      </header>
      <main>{children}</main>
      <footer id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-28">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Un projet à lancer ? <span className="font-script font-normal italic text-lime">Parlons-en.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-paper/75">Décris-moi ton besoin en quelques lignes : site vitrine, e-commerce, application de gestion. Je te réponds par email.</p>
          </div>
          <div className="border border-lime p-3">
            <ContactForm />
          </div>
        </div>
        <div className="mt-20 border-t border-lime/30 pt-10">
          <ContactBar profile={profile} />
        </div>
        <p className="mt-16 text-sm text-paper/50">© {new Date().getFullYear()} {profile.fullName}</p>
      </footer>
    </>
  );
}
