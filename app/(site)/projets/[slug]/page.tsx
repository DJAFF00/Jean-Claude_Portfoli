import Link from "next/link";
import ProjectShot from "@/components/ProjectShot";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/queries";

export const revalidate = 60;

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 pt-16">
      <Link href="/projets" className="text-paper/60 hover:text-accent">Retour aux projets</Link>
      <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">{p.title}</h1>
      <p className="mt-6 max-w-2xl text-xl text-paper/80">{p.summary}</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {p.stack.map((s) => <li key={s} className="rounded-full border border-accent/60 px-3 py-1 text-sm text-accent">{s}</li>)}
      </ul>
      <div className="group mt-12"><ProjectShot src={p.imageUrl} title={p.title} /></div>
      <div className="mt-12 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-paper/85">{p.description}</div>
      <div className="mt-12 flex flex-wrap gap-4">
        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent">Voir le site</a>}
        {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn border-paper/40 bg-transparent hover:bg-paper hover:text-ink">Voir le code</a>}
      </div>
    </article>
  );
}
