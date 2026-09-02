import { notFound } from "next/navigation";
import { getProjectBySlug, ALL_PROJECTS } from "@/lib/projects";
import { getComplianceDocs } from "@/lib/complianceDocs";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import EnvironmentCompliance from "@/components/EnvironmentCompliance";

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} | The 5 Elements`,
    description: project.about,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Runs at build time. Empty array → the section is never rendered.
  const complianceDocs = getComplianceDocs(project.pdfFolder);

  return (
    <>
      <ProjectDetailClient project={project} />
      <EnvironmentCompliance
        documents={complianceDocs}
        projectName={project.name}
        reraNumber={project.reraNumber}
        id={`environment-${project.slug}`}
      />
    </>
  );
}