import Link from "next/link";
import { getPublishedProjects } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Projets" };

export default async function Projets() {
  const projects = await getPublishedProjects();
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">Projets</h1>
      {projects.length === 0 && <p className="mt-10 text-paper/60">Aucun projet publié pour l'instant.</p>}
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {projects.map((p, i) => (
          <Link key={p.id} href={`/projets/${p.slug}`} className={`group block ${i % 2 ? "md:mt-16" : ""}`}>
            <div className="aspect-[4/3] overflow-hidden bg-paper">
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-moss to-olive font-script text-5xl text-lime">{p.title}</div>
              )}
            </div>
            <h2 className="mt-5 text-2xl font-bold group-hover:text-lime">{p.title}</h2>
            <p className="mt-1 text-paper/70">{p.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
