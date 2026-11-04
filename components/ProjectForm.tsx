import type { Project } from "@prisma/client";
import { saveProject } from "@/app/admin/actions";

export default function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={saveProject} className="space-y-6 bg-paper p-8 text-ink">
      {project && <input type="hidden" name="id" value={project.id} />}
      <div>
        <label className="label" htmlFor="title">Titre</label>
        <input id="title" name="title" required defaultValue={project?.title} className="field" />
      </div>
      <div>
        <label className="label" htmlFor="summary">Résumé (une ou deux phrases)</label>
        <input id="summary" name="summary" required defaultValue={project?.summary} className="field" />
      </div>
      <div>
        <label className="label" htmlFor="description">Description complète</label>
        <textarea id="description" name="description" rows={8} defaultValue={project?.description} className="field" />
      </div>
      <div>
        <label className="label" htmlFor="stack">Technologies (séparées par des virgules)</label>
        <input id="stack" name="stack" placeholder="Laravel, MySQL, Bootstrap" defaultValue={project?.stack.join(", ")} className="field" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="liveUrl">Lien du site</label>
          <input id="liveUrl" name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} className="field" />
        </div>
        <div>
          <label className="label" htmlFor="repoUrl">Lien GitHub</label>
          <input id="repoUrl" name="repoUrl" type="url" defaultValue={project?.repoUrl ?? ""} className="field" />
        </div>
        <div>
          <label className="label" htmlFor="imageUrl">Lien de l'image</label>
          <input id="imageUrl" name="imageUrl" type="url" defaultValue={project?.imageUrl ?? ""} className="field" />
        </div>
        <div>
          <label className="label" htmlFor="position">Ordre d'affichage (0 en premier)</label>
          <input id="position" name="position" type="number" defaultValue={project?.position ?? 0} className="field" />
        </div>
      </div>
      <label className="flex items-center gap-3 font-semibold">
        <input type="checkbox" name="published" defaultChecked={project?.published} className="h-5 w-5 accent-[#3f5f0a]" />
        Publier sur le site
      </label>
      <button className="btn">Enregistrer</button>
    </form>
  );
}
