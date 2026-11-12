"use server";

import { db } from "@/lib/db";

export type ContactState = { ok: boolean; error?: string } | null;

export async function sendMessage(_: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège : un humain ne le voit pas, un robot le remplit.
  if (String(formData.get("website") ?? "")) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (name.length < 2 || name.length > 100) return { ok: false, error: "Indique ton nom." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return { ok: false, error: "Cette adresse email n'est pas valide." };
  if (body.length < 10) return { ok: false, error: "Ton message est trop court (10 caractères minimum)." };
  if (body.length > 2000) return { ok: false, error: "Ton message est trop long (2000 caractères maximum)." };

  try {
    const recent = await db.message.count({ where: { createdAt: { gt: new Date(Date.now() - 10 * 60 * 1000) } } });
    if (recent >= 10) return { ok: false, error: "Trop de messages en ce moment, réessaie dans quelques minutes." };
    await db.message.create({ data: { name, email, body } });
  } catch {
    return { ok: false, error: "Le message n'a pas pu être envoyé. Écris-moi directement par email." };
  }
  return { ok: true };
}
