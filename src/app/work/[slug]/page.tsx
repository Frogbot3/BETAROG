import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectArtwork } from "@/components/projects";
import { ButtonLink, Chips, Eyebrow } from "@/components/ui";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project?.name || "Project not found",
    description: project?.description,
    alternates: { canonical: `/work/${slug}` },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="case-study container">
      <Link href="/work" className="back-link">
        <ArrowLeft size={16} />
        All work
      </Link>
      <header className="case-header">
        <Eyebrow>{project.category}</Eyebrow>
        <h1>{project.name}</h1>
        <p className="case-description">{project.description}</p>
        <div className="case-meta">
          <span className="status-badge">{project.status}</span>
          {project.url && (
            <a
              href={project.url}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the live site
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </header>
      <ProjectArtwork project={project} large />
      <div className="case-body">
        <aside>
          <Eyebrow>Built with</Eyebrow>
          <Chips items={project.stack} />
          {project.visual !== "commerce" && (
            <p className="small muted">
              Conceptual artwork accompanies this project. It does not represent
              a completed product interface.
            </p>
          )}
        </aside>
        <div>
          {project.story.map((section, idx) => (
            <section key={section.title} data-reveal>
              <span className="mono accent">0{idx + 1}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
      <div className="case-next">
        <div>
          <Eyebrow>Next exploration</Eyebrow>
          <h2>{next.name}</h2>
        </div>
        <ButtonLink
          href={`/work/${next.slug}`}
          variant="outline"
          direction="up"
        >
          View project
        </ButtonLink>
      </div>
    </article>
  );
}
