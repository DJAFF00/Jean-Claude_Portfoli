import LoginForm from "./LoginForm";
import Mark from "@/components/Mark";

export const metadata = { title: "Connexion" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md border border-lime p-3">
        <div className="bg-paper p-8 text-ink">
          <div className="flex items-center gap-3"><Mark /> <h1 className="text-2xl font-extrabold">Espace admin</h1></div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
