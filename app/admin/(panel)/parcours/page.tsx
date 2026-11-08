import { getParcours } from "@/lib/queries";
import { saveItem, deleteItem } from "../../actions";

export const dynamic = "force-dynamic";

type Field = { name: string; label: string; required?: boolean; wide?: boolean };
type Kind = "experience" | "education" | "skill";

const CONFIG: { kind: Kind; title: string; add: string; fields: Field[] }[] = [
  { kind: "experience", title: "Expérience", add: "Ajouter une expérience", fields: [
    { name: "place", label: "Entreprise", required: true },
    { name: "role", label: "Poste", required: true },
    { name: "period", label: "Période (ex. 2024)" },
    { name: "description", label: "Description", wide: true },
  ]},
  { kind: "education", title: "Formation", add: "Ajouter une formation", fields: [
    { name: "school", label: "École", required: true },
    { name: "degree", label: "Diplôme", required: true },
    { name: "years", label: "Années (ex. 2023–2024)" },
    { name: "details", label: "Détails", wide: true },
  ]},
  { kind: "skill", title: "Compétences", add: "Ajouter une catégorie", fields: [
    { name: "category", label: "Catégorie", required: true },
    { name: "items", label: "Technologies (séparées par des virgules)", required: true, wide: true },
  ]},
];

function ItemForm({ kind, fields, item }: { kind: Kind; fields: Field[]; item?: Record<string, unknown> }) {
  return (
    <form action={saveItem.bind(null, kind)} className="grid gap-4 bg-paper p-6 text-ink md:grid-cols-2">
      {item && <input type="hidden" name="id" value={String(item.id)} />}
      {fields.map((f) => (
        <div key={f.name} className={f.wide ? "md:col-span-2" : ""}>
          <label className="label" htmlFor={`${kind}-${item?.id ?? "new"}-${f.name}`}>{f.label}</label>
          <input
            id={`${kind}-${item?.id ?? "new"}-${f.name}`}
            name={f.name}
            required={f.required}
            defaultValue={item ? String(item[f.name] ?? "") : ""}
            className="field"
          />
        </div>
      ))}
      <div>
        <label className="label" htmlFor={`${kind}-${item?.id ?? "new"}-position`}>Ordre (0 en premier)</label>
        <input id={`${kind}-${item?.id ?? "new"}-position`} name="position" type="number" defaultValue={item ? Number(item.position) : 0} className="field" />
      </div>
      <div className="flex items-end gap-5 md:col-span-2">
        <button className="btn">{item ? "Enregistrer" : "Ajouter"}</button>
        {item && (
          <button formAction={deleteItem.bind(null, kind)} formNoValidate className="font-semibold text-red-700 underline">Supprimer</button>
        )}
      </div>
    </form>
  );
}

export default async function ParcoursAdmin() {
  const data = await getParcours();
  const lists = { experience: data.experience, education: data.education, skill: data.skills };
  return (
    <>
      <h1 className="text-3xl font-extrabold">Parcours</h1>
      {CONFIG.map((c) => (
        <section key={c.kind} className="mt-12">
          <h2 className="mb-5 text-xl font-bold text-lime">{c.title}</h2>
          <div className="space-y-4">
            {lists[c.kind].map((it) => (
              <ItemForm key={it.id} kind={c.kind} fields={c.fields} item={it as unknown as Record<string, unknown>} />
            ))}
          </div>
          <details className="mt-5">
            <summary className="cursor-pointer font-semibold text-lime">{c.add}</summary>
            <div className="mt-4"><ItemForm kind={c.kind} fields={c.fields} /></div>
          </details>
        </section>
      ))}
    </>
  );
}
