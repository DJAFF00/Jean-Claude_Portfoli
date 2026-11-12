import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import Mark from "@/components/Mark";
import { db } from "@/lib/db";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const unread = await db.message.count({ where: { read: false } }).catch(() => 0);
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-accent/30 pb-6">
        <div className="flex items-center gap-3 text-lg font-extrabold"><Mark className="h-7 w-7" /> Tableau de bord</div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/admin" className="hover:text-accent">Projets</Link>
          <Link href="/admin/messages" className="hover:text-accent">Messages{unread > 0 && <span className="ml-2 bg-accent px-2 py-0.5 text-xs font-bold text-ink">{unread}</span>}</Link>
          <Link href="/admin/parcours" className="hover:text-accent">Parcours</Link>
          <Link href="/admin/profile" className="hover:text-accent">Mon profil</Link>
          <Link href="/" target="_blank" className="hover:text-accent">Voir le site</Link>
          <form action={logout}><button className="text-paper/60 hover:text-accent">Se déconnecter</button></form>
        </nav>
      </header>
      <div className="pt-10">{children}</div>
    </div>
  );
}
