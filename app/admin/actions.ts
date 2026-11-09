"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { db } from "@/lib/db";
import { createSession, destroySession, requireAdmin } from "@/lib/auth";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const opt = (f: FormData, k: string) => str(f, k) || null;

function slugify(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "projet";
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE = 4 * 1024 * 1024;
const isBlob = (u?: string | null) => !!u && u.includes("blob.vercel-storage.com");
async function dropBlob(u?: string | null) {
  if (!isBlob(u)) return;
  try { await del(u!); } catch {}
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/projets");
  revalidatePath("/projets/[slug]", "page");
}

export async function login(_: string | null, formData: FormData) {
  const email = str(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const okEmail = email === (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const okPass = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH ?? "");
  if (!okEmail || !okPass) return "Email ou mot de passe incorrect.";
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return;
  const back = id ? `/admin/projects/${id}` : "/admin/projects/new";

  const existing = id ? await db.project.findUnique({ where: { id } }) : null;
  let imageUrl = opt(formData, "imageUrl");
  if (formData.get("removeImage") === "on") imageUrl = null;

  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    if (!IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE) redirect(`${back}?error=image`);
    if (!process.env.BLOB_READ_WRITE_TOKEN) redirect(`${back}?error=token`);
    try {
      const blob = await put(`projects/${slugify(title)}-${file.name}`, file, { access: "public", addRandomSuffix: true });
      imageUrl = blob.url;
    } catch (e) {
      console.error("Blob upload failed:", e);
      const detail = e instanceof Error ? e.message.slice(0, 200) : "";
      redirect(`${back}?error=upload&detail=${encodeURIComponent(detail)}`);
    }
  }

  const data = {
    title,
    summary: str(formData, "summary"),
    description: str(formData, "description"),
    imageUrl,
    liveUrl: opt(formData, "liveUrl"),
    repoUrl: opt(formData, "repoUrl"),
    stack: str(formData, "stack").split(",").map((s) => s.trim()).filter(Boolean),
    position: Number(str(formData, "position")) || 0,
    published: formData.get("published") === "on",
  };

  if (id) {
    await db.project.update({ where: { id }, data });
    if (existing?.imageUrl && existing.imageUrl !== imageUrl) await dropBlob(existing.imageUrl);
  } else {
    let slug = slugify(title);
    if (await db.project.findUnique({ where: { slug } })) slug += "-" + Math.random().toString(36).slice(2, 6);
    await db.project.create({ data: { ...data, slug } });
  }
  refresh();
  redirect("/admin");
}

export async function togglePublish(id: string) {
  await requireAdmin();
  const p = await db.project.findUnique({ where: { id } });
  if (p) await db.project.update({ where: { id }, data: { published: !p.published } });
  refresh();
  revalidatePath("/admin");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  const p = await db.project.findUnique({ where: { id } });
  await db.project.delete({ where: { id } });
  await dropBlob(p?.imageUrl);
  refresh();
  revalidatePath("/admin");
}

export async function saveProfile(formData: FormData) {
  await requireAdmin();
  const data = {
    fullName: str(formData, "fullName"),
    headline: str(formData, "headline"),
    bio: str(formData, "bio"),
    email: str(formData, "email"),
    phone: opt(formData, "phone"),
    location: opt(formData, "location"),
    github: opt(formData, "github"),
    linkedin: opt(formData, "linkedin"),
    cvUrl: opt(formData, "cvUrl"),
    available: formData.get("available") === "on",
  };
  await db.profile.upsert({ where: { id: 1 }, update: data, create: { id: 1, ...data } });
  refresh();
  revalidatePath("/admin/profile");
  redirect("/admin/profile?saved=1");
}

type Kind = "experience" | "education" | "skill";
const FIELDS: Record<Kind, string[]> = {
  experience: ["place", "role", "period", "description"],
  education: ["school", "degree", "years", "details"],
  skill: ["category", "items"],
};
const REQUIRED: Record<Kind, string[]> = {
  experience: ["place", "role"],
  education: ["school", "degree"],
  skill: ["category", "items"],
};

export async function saveItem(kind: Kind, formData: FormData) {
  await requireAdmin();
  const data: Record<string, string | number | null> = {};
  for (const f of FIELDS[kind]) data[f] = REQUIRED[kind].includes(f) ? str(formData, f) : opt(formData, f);
  if (REQUIRED[kind].some((f) => !data[f])) return;
  data.position = Number(str(formData, "position")) || 0;
  const id = str(formData, "id");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = db[kind] as any;
  if (id) await model.update({ where: { id }, data });
  else await model.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/parcours");
}

export async function deleteItem(kind: Kind, formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (db[kind] as any).delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/parcours");
}
