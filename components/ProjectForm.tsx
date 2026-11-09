import type { Project } from "@prisma/client";
import { saveProject } from "@/app/admin/actions";
import ImageInput from "./ImageInput";

export default function ProjectForm({ project, error, detail }: { project?: Project; error?: string; detail?: string }) {
  return (
    <form action={saveProject} className="space-y-6 bg-paper p-8 text-ink">
      {project && <input type="hidden" name="id" value={project.id} />}
      {error && (
        <p role="alert" className="border border-red-700 px-4 py-3 font-medium text-red-700">
          {error === "image"
            ? "Image refusée : utilise un JPG, PNG, WebP ou AVIF de 4 Mo maximum."
            : error === "token"
            ? "Le stockage d'images n'est pas configuré : la variable BLOB_READ_WRITE_TOKEN est introuvable sur ce déploiement."
            : `L'envoi de l'image a échoué.${detail ? " Détail : " + detail : ""}`}
        </p>
      )}
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
          <label className="label" htmlFor="position">Ordre d'affichage (0 en premier)</label>
          <input id="position" name="position" type="number" defaultValue={project?.position ?? 0} className="field" />
        </div>
      </div>
      <fieldset className="space-y-4 border border-ink/15 p-5">
        <legend className="px-2 font-semibold">Image du projet</legend>
        {project?.imageUrl && (
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.imageUrl} alt="" className="max-h-48 border border-ink/15" />
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" name="removeImage" className="h-4 w-4 accent-[#3f5f0a]" /> Supprimer cette image
            </label>
          </div>
        )}
        <div>
          <label className="label" htmlFor="image">Envoyer une image (JPG, PNG, WebP, 4 Mo max)</label>
          <ImageInput />
        </div>
        <div>
          <label className="label" htmlFor="imageUrl">Ou coller le lien d'une image</label>
          <input id="imageUrl" name="imageUrl" type="url" defaultValue={project?.imageUrl ?? ""} className="field" />
        </div>
      </fieldset>
      <label className="flex items-center gap-3 font-semibold">
        <input type="checkbox" name="published" defaultChecked={project?.published} className="h-5 w-5 accent-[#3f5f0a]" />
        Publier sur le site
      </label>
      <button className="btn">Enregistrer</button>
    </form>
  );
}
