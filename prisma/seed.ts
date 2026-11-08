import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  await db.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      fullName: "Jean-Claude Aimé Manakel Houessou",
      headline: "Ingénieur en systèmes informatiques et logiciels, développeur full stack",
      bio: "J'écris du Python, du PHP et du JavaScript, et j'administre les serveurs sur lesquels tout cela tourne. Je conçois, déploie et améliore des applications web utiles et fiables : gestion de stock, réservation et paiement, sites vitrines, e-commerce.",
      email: "djaffmanakel259451@gmail.com",
      phone: "+229 01 52 27 17 12",
      location: "Cotonou, Bénin",
    },
  });

  if ((await db.experience.count()) === 0) {
    await db.experience.createMany({ data: [
      { place: "M.A. Consulting", role: "Stagiaire développeur web", position: 0 },
      { place: "MAPCOM Technologie", role: "Stagiaire développeur web", position: 1 },
      { place: "1020 Technologie", role: "Stagiaire développeur web", position: 2 },
    ]});
  }
  if ((await db.education.count()) === 0) {
    await db.education.create({ data: {
      school: "École Supérieure d'Enseignement Professionnel Le Berger",
      degree: "Licence en systèmes informatiques et logiciels",
      years: "2023–2024",
      details: "Projet de fin d'études : World Fitness, une application web de gestion de salle de sport avec réservation et paiement.",
    }});
  }
  if ((await db.skill.count()) === 0) {
    await db.skill.createMany({ data: [
      { category: "Langages", items: "Python, PHP, Java, JavaScript", position: 0 },
      { category: "Frameworks", items: "Laravel, Angular, Bootstrap, Next.js", position: 1 },
      { category: "Données et outils", items: "MySQL, PostgreSQL, GitHub, Dolibarr", position: 2 },
      { category: "Systèmes et réseaux", items: "Linux, déploiement de serveurs, réseaux IP, serveurs rack", position: 3 },
      { category: "Sécurité", items: "Kaspersky Endpoint Security, Kaspersky Security for Microsoft Office 365", position: 4 },
    ]});
  }
}
main().finally(() => db.$disconnect());
