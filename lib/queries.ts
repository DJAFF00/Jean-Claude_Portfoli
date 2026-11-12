import { db } from "./db";
import type { Profile, Project } from "@prisma/client";

export const fallbackProfile: Profile = {
  id: 1,
  fullName: "Jean-Claude Houessou",
  headline: "Développeur full stack",
  bio: "Profil à renseigner depuis l'espace admin.",
  email: "",
  phone: null,
  location: null,
  github: null,
  linkedin: null,
  cvUrl: null,
  photoUrl: null,
  available: true,
};

export async function getProfile(): Promise<Profile> {
  try {
    return (await db.profile.findUnique({ where: { id: 1 } })) ?? fallbackProfile;
  } catch {
    return fallbackProfile;
  }
}

export async function getPublishedProjects(limit?: number): Promise<Project[]> {
  try {
    return await db.project.findMany({
      where: { published: true },
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
      take: limit,
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await db.project.findFirst({ where: { slug, published: true } });
  } catch {
    return null;
  }
}

export async function getParcours() {
  try {
    const [experience, education, skills] = await Promise.all([
      db.experience.findMany({ orderBy: { position: "asc" } }),
      db.education.findMany({ orderBy: { position: "asc" } }),
      db.skill.findMany({ orderBy: { position: "asc" } }),
    ]);
    return { experience, education, skills };
  } catch {
    return { experience: [], education: [], skills: [] };
  }
}
