import ProjectForm from "@/components/ProjectForm";

export default async function NewProject({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <>
      <h1 className="mb-8 text-3xl font-extrabold">Nouveau projet</h1>
      <ProjectForm error={error} />
    </>
  );
}
