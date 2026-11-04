import { getProfile } from "@/lib/queries";
import { saveProfile } from "../../actions";

export const dynamic = "force-dynamic";

const F = ({ id, label, def, type = "text", req = false }: { id: string; label: string; def?: string | null; type?: string; req?: boolean }) => (
  <div>
    <label className="label" htmlFor={id}>{label}</label>
    <input id={id} name={id} type={type} required={req} defaultValue={def ?? ""} className="field" />
  </div>
);

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const [p, sp] = await Promise.all([getProfile(), searchParams]);
  return (
    <>
      <h1 className="mb-8 text-3xl font-extrabold">Mon profil</h1>
      {sp.saved && <p role="status" className="mb-6 border border-lime px-4 py-3 text-lime">Profil enregistré.</p>}
      <form action={saveProfile} className="space-y-6 bg-paper p-8 text-ink">
        <F id="fullName" label="Nom complet" def={p.fullName} req />
        <F id="headline" label="Titre affiché sous le nom" def={p.headline} req />
        <div>
          <label className="label" htmlFor="bio">Présentation</label>
          <textarea id="bio" name="bio" rows={5} required defaultValue={p.bio} className="field" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <F id="email" label="Email" def={p.email} type="email" req />
          <F id="phone" label="Téléphone" def={p.phone} />
          <F id="location" label="Ville" def={p.location} />
          <F id="cvUrl" label="Lien du CV (PDF)" def={p.cvUrl} type="url" />
          <F id="github" label="Lien GitHub" def={p.github} type="url" />
          <F id="linkedin" label="Lien LinkedIn" def={p.linkedin} type="url" />
        </div>
        <label className="flex items-center gap-3 font-semibold">
          <input type="checkbox" name="available" defaultChecked={p.available} className="h-5 w-5 accent-[#3f5f0a]" />
          Afficher « Disponible pour une mission »
        </label>
        <button className="btn">Enregistrer</button>
      </form>
    </>
  );
}
