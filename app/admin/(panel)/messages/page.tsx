import { db } from "@/lib/db";
import { toggleRead, deleteMessage } from "../../actions";

export const dynamic = "force-dynamic";

export default async function Messages() {
  const messages = await db.message.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <>
      <h1 className="text-3xl font-extrabold">Messages</h1>
      {messages.length === 0 ? (
        <p className="mt-10 text-paper/60">Aucun message pour l'instant.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {messages.map((m) => (
            <li key={m.id} className={`bg-paper p-6 text-ink ${m.read ? "opacity-70" : "border-l-8 border-accent"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-lg font-bold">{m.name}</p>
                <p className="text-sm text-ink/60">{m.createdAt.toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Porto-Novo" })}</p>
              </div>
              <a href={`mailto:${m.email}?subject=Re : ton message sur mon portfolio`} className="font-medium underline">{m.email}</a>
              <p className="mt-4 whitespace-pre-line">{m.body}</p>
              <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
                <a href={`mailto:${m.email}?subject=Re : ton message sur mon portfolio`} className="btn !py-2">Répondre</a>
                <form action={toggleRead.bind(null, m.id)}><button className="underline">{m.read ? "Marquer comme non lu" : "Marquer comme lu"}</button></form>
                <form action={deleteMessage.bind(null, m.id)}><button className="text-red-700 underline">Supprimer</button></form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
