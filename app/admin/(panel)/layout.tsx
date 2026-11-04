import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import Mark from "@/components/Mark";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-lime/30 pb-6">
        <div className="flex items-center gap-3 text-lg font-extrabold"><Mark className="h-7 w-7" /> Tableau de bord</div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/admin" className="hover:text-lime">Projets</Link>
          <Link href="/admin/profile" className="hover:text-lime">Mon profil</Link>
          <Link href="/" target="_blank" className="hover:text-lime">Voir le site</Link>
          <form action={logout}><button className="text-paper/60 hover:text-lime">Se déconnecter</button></form>
        </nav>
      </header>
      <div className="pt-10">{children}</div>
    </div>
  );
}
