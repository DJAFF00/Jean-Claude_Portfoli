import Link from "next/link";
import ProjectShot from "@/components/ProjectShot";
import { getPublishedProjects } from "@/lib/queries";

export const revalidate = 60;
export const metadata = { title: "Projets" };

export default async function Projets() {
  const projects = await getPublishedProjects();
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
        Mes <span className="font-script font-normal italic text-lime">projets</span>
      </h1>
      {projects.length === 0 && <p className="mt-10 text-paper/60">Aucun projet publié pour l'instant.</p>}
      <div className="mt-16 grid gap-x-12 gap-y-20 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.id}>
            <Link href={`/projets/${p.slug}`} className="group block" aria-label={p.title}>
              <ProjectShot src={p.imageUrl} title={p.title} />
            </Link>
            <h2 className="mt-8 text-2xl font-extrabold md:text-3xl">
              <Link href={`/projets/${p.slug}`} className="hover:text-lime">{p.title}</Link>
            </h2>
            <p className="mt-3 text-paper/75">{p.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((t) => <li key={t} className="border border-lime/50 px-3 py-1 text-sm text-lime">{t}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
