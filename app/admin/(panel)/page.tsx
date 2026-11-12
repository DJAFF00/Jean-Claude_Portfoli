import Link from "next/link";
import { db } from "@/lib/db";
import { togglePublish, deleteProject } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const projects = await db.project.findMany({ orderBy: [{ position: "asc" }, { createdAt: "desc" }] });
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Projets</h1>
        <Link href="/admin/projects/new" className="btn btn-accent">Ajouter un projet</Link>
      </div>
      {projects.length === 0 ? (
        <p className="mt-10 text-paper/60">Aucun projet. Ajoute le premier avec le bouton ci-dessus.</p>
      ) : (
        <ul className="mt-8 divide-y divide-ink/15 bg-paper text-ink">
          {projects.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
              <div>
                <p className="text-lg font-bold">{p.title}</p>
                <p className={p.published ? "font-medium text-rust" : "text-ink/50"}>{p.published ? "Publié" : "Brouillon"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
                <form action={togglePublish.bind(null, p.id)}><button className="underline">{p.published ? "Dépublier" : "Publier"}</button></form>
                <Link href={`/admin/projects/${p.id}`} className="underline">Modifier</Link>
                <form action={deleteProject.bind(null, p.id)}><button className="text-red-700 underline">Supprimer</button></form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
