import Link from "next/link";
import Mark from "@/components/Mark";
import ContactBar from "@/components/ContactBar";
import { getProfile } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <Mark /> <span>Houessou<span className="font-light">.dev</span></span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-paper/80">
          <Link href="/projets" className="hover:text-lime">Projets</Link>
          <Link href="/#parcours" className="hover:text-lime">Parcours</Link>
          <Link href="/#contact" className="hover:text-lime">Contact</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer id="contact" className="mx-auto max-w-6xl px-6 pb-16 pt-28">
        <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Un projet à lancer ? <span className="font-script font-normal italic text-lime">Parlons-en.</span>
        </h2>
        <div className="mt-12 border-t border-lime/30 pt-10">
          <ContactBar profile={profile} />
        </div>
        <p className="mt-16 text-sm text-paper/50">© {new Date().getFullYear()} {profile.fullName}</p>
      </footer>
    </>
  );
}
