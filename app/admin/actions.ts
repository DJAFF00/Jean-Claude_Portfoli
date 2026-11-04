"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSession, destroySession, requireAdmin } from "@/lib/auth";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const opt = (f: FormData, k: string) => str(f, k) || null;

function slugify(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "projet";
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

  const data = {
    title,
    summary: str(formData, "summary"),
    description: str(formData, "description"),
    imageUrl: opt(formData, "imageUrl"),
    liveUrl: opt(formData, "liveUrl"),
    repoUrl: opt(formData, "repoUrl"),
    stack: str(formData, "stack").split(",").map((s) => s.trim()).filter(Boolean),
    position: Number(str(formData, "position")) || 0,
    published: formData.get("published") === "on",
  };

  if (id) {
    await db.project.update({ where: { id }, data });
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
  await db.project.delete({ where: { id } });
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
