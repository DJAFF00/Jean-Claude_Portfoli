import { getProfile } from "@/lib/queries";
import { saveProfile } from "../../actions";
import ImageInput from "@/components/ImageInput";

export const dynamic = "force-dynamic";

const F = ({ id, label, def, type = "text", req = false }: { id: string; label: string; def?: string | null; type?: string; req?: boolean }) => (
  <div>
    <label className="label" htmlFor={id}>{label}</label>
    <input id={id} name={id} type={type} required={req} defaultValue={def ?? ""} className="field" />
  </div>
);

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const [p, sp] = await Promise.all([getProfile(), searchParams]);
  return (
    <>
      <h1 className="mb-8 text-3xl font-extrabold">Mon profil</h1>
      {sp.error && (
        <p role="alert" className="mb-6 border border-red-500 px-4 py-3 text-red-400">
          {sp.error === "image" ? "Image refusée : JPG, PNG, WebP ou AVIF, 4 Mo maximum." : sp.error === "token" ? "Le stockage d'images n'est pas configuré (BLOB_READ_WRITE_TOKEN introuvable)." : "L'envoi de la photo a échoué."}
        </p>
      )}
      {sp.saved && <p role="status" className="mb-6 border border-accent px-4 py-3 text-accent">Profil enregistré.</p>}
      <form action={saveProfile} className="space-y-6 rounded-3xl bg-paper p-8 text-ink">
        <F id="fullName" label="Nom complet" def={p.fullName} req />
        <F id="headline" label="Titre affiché sous le nom" def={p.headline} req />
        <div>
          <label className="label" htmlFor="bio">Présentation</label>
          <textarea id="bio" name="bio" rows={5} required defaultValue={p.bio} className="field" />
        </div>
        <fieldset className="space-y-4 border border-ink/15 p-5">
          <legend className="px-2 font-semibold">Ma photo (page d'accueil)</legend>
          {p.photoUrl && (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photoUrl} alt="" className="max-h-56 border border-ink/15" />
              <label className="flex items-center gap-2 text-sm font-medium">
                <input type="checkbox" name="removePhoto" className="h-4 w-4 accent-[#c2410c]" /> Supprimer la photo
              </label>
            </div>
          )}
          <div>
            <label className="label" htmlFor="image">Envoyer une photo (portrait, 4 Mo max)</label>
            <ImageInput />
          </div>
        </fieldset>
        <div className="grid gap-6 md:grid-cols-2">
          <F id="email" label="Email" def={p.email} type="email" req />
          <F id="phone" label="Téléphone" def={p.phone} />
          <F id="location" label="Ville" def={p.location} />
          <F id="cvUrl" label="Lien du CV (PDF)" def={p.cvUrl} type="url" />
          <F id="github" label="Lien GitHub" def={p.github} type="url" />
          <F id="linkedin" label="Lien LinkedIn" def={p.linkedin} type="url" />
        </div>
        <label className="flex items-center gap-3 font-semibold">
          <input type="checkbox" name="available" defaultChecked={p.available} className="h-5 w-5 accent-[#c2410c]" />
          Afficher « Disponible pour une mission »
        </label>
        <button className="btn">Enregistrer</button>
      </form>
    </>
  );
}
