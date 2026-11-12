"use client";
import { useActionState } from "react";
import { sendMessage } from "@/app/(site)/contact-action";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, null);

  if (state?.ok) {
    return (
      <div role="status" className="rounded-3xl bg-paper p-8 text-ink">
        <p className="text-2xl font-extrabold">Message envoyé.</p>
        <p className="mt-2 text-ink/75">Merci, je te réponds dès que possible.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5 rounded-3xl bg-paper p-8 text-ink">
      <div className="hidden" aria-hidden>
        <label>Ne pas remplir <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <label className="label" htmlFor="c-name">Nom</label>
        <input id="c-name" name="name" required maxLength={100} autoComplete="name" className="field" />
      </div>
      <div>
        <label className="label" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
      </div>
      <div>
        <label className="label" htmlFor="c-body">Message</label>
        <textarea id="c-body" name="body" required minLength={10} maxLength={2000} rows={5} className="field" />
      </div>
      {state?.error && <p role="alert" className="font-medium text-red-700">{state.error}</p>}
      <button className="btn w-full" disabled={pending}>{pending ? "Envoi…" : "Envoyer le message"}</button>
    </form>
  );
}
