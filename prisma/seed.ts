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
}
main().finally(() => db.$disconnect());
