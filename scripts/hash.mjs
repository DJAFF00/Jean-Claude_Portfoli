import bcrypt from "bcryptjs";
const pwd = process.argv[2];
if (!pwd) { console.error('Usage : npm run hash-password -- "ton mot de passe"'); process.exit(1); }
const hash = bcrypt.hashSync(pwd, 12);
console.log("\nSur Vercel (tel quel) :\n" + hash);
console.log("\nEn local dans .env (avec $ échappés) :\n" + hash.replace(/\$/g, "\\$") + "\n");
