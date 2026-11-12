"use client";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <div className="overflow-hidden rounded-[2rem] border border-accent/60 p-3">
        <div className="rounded-3xl bg-paper p-8 text-ink">
          <h1 className="text-2xl font-extrabold">Une erreur est survenue</h1>
          <p className="mt-3">L'action n'a pas abouti. Réessaie, ou retourne à la liste des projets.</p>
          {error.digest && <p className="mt-3 text-sm text-ink/60">Code : {error.digest}</p>}
          <div className="mt-6 flex gap-4">
            <button onClick={reset} className="btn">Réessayer</button>
            <a href="/admin" className="btn btn-accent">Retour aux projets</a>
          </div>
        </div>
      </div>
    </div>
  );
}
