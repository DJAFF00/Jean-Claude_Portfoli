import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ProjectForm from "@/components/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProject({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; detail?: string }> }) {
  const { id } = await params;
  const { error, detail } = await searchParams;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();
  return (
    <>
      <h1 className="mb-8 text-3xl font-extrabold">Modifier « {project.title} »</h1>
      <ProjectForm project={project} error={error} detail={detail} />
    </>
  );
}
