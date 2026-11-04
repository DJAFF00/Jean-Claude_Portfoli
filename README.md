# Portfolio — Jean-Claude Houessou

Next.js 15 (App Router) · Tailwind 4 · Prisma · Neon Postgres · Vercel

## Démarrage local
1. `npm install`
2. Copie `.env.example` vers `.env` et remplis-le (voir ci-dessous).
3. `npm run db:push` puis `npm run db:seed`
4. `npm run dev` → http://localhost:3000 — admin : http://localhost:3000/admin

## Variables d'environnement
- `DATABASE_URL` / `DIRECT_URL` : chaînes Neon (pooled / directe).
- `ADMIN_EMAIL` : ton email de connexion.
- `ADMIN_PASSWORD_HASH` : `npm run hash-password -- "ton mot de passe"`.
- `AUTH_SECRET` : `openssl rand -base64 32`.

## Déploiement Vercel
Importe le dépôt GitHub, ajoute les 5 variables ci-dessus dans Settings > Environment Variables, déploie.
Lance `db:push` et `db:seed` une fois depuis ton poste avec les chaînes Neon de production.
