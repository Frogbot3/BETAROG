"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Layers3, ShieldCheck } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { Chips, SectionHeading } from "./ui";

export function ProjectArtwork({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`project-artwork artwork-${project.visual} ${large ? "artwork-large" : ""}`}
    >
      {project.visual === "commerce" && (
        <>
          <span className="artwork-label">Live storefront</span>
          <div className="browser-frame">
            <div className="browser-toolbar">
              <i />
              <i />
              <i />
              <span>techai-theta.vercel.app</span>
            </div>
            <Image
              src="/images/tech-ai.webp"
              width={1440}
              height={1000}
              alt={project.imageAlt || "TECH AI storefront"}
              sizes={large ? "90vw" : "(max-width: 700px) 90vw, 50vw"}
              className="storefront-image"
            />
          </div>
        </>
      )}
      {project.visual === "mosque" && (
        <>
          <Image
            src="/images/mosque-study.webp"
            fill
            alt="Conceptual layered architectural arches in indigo and lavender; not a product screenshot"
            sizes={large ? "90vw" : "(max-width: 700px) 90vw, 45vw"}
          />
          <div className="artwork-copy">
            <span className="artwork-label">Concept artwork</span>
            <span className="mosque-wordmark">
              MOSQUE
              <br />
              SUITE
            </span>
            <span className="status-badge">In Development</span>
          </div>
        </>
      )}
      {project.visual === "security" && (
        <div className="abstract-project">
          <ShieldCheck size={100} strokeWidth={0.65} />
          <span>
            SECURITY
            <br />
            IN FOCUS.
          </span>
          <small>Experimental project</small>
        </div>
      )}
      {project.visual === "research" && (
        <div className="abstract-project">
          <Layers3 size={100} strokeWidth={0.65} />
          <span>
            QUESTIONS.
            <br />
            POSSIBILITIES.
          </span>
          <small>Areas of exploration</small>
        </div>
      )}
    </div>
  );
}
export function Projects() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(
    (project) => filter === "All work" || project.filter === filter,
  );
  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionHeading number="03" label="Selected work">
          Built With Purpose.
          <br />
          Engineered With Precision.
        </SectionHeading>
        <div className="work-toolbar">
          <p>Real projects. Open explorations. Purpose in every line.</p>
          <div
            className="work-filters"
            role="group"
            aria-label="Filter projects"
          >
            {["All work", "Web", "Software", "Research"].map((name) => (
              <button
                key={name}
                aria-pressed={filter === name}
                className={filter === name ? "selected" : ""}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {visible.length} projects shown
        </p>
        <div className="project-grid" data-stagger>
          {visible.map((project) => (
            <article
              className={`project-card ${filter === "All work" && project.filter === "Research" ? "project-compact" : ""}`}
              key={`${filter}:${project.slug}`}
              data-reveal
            >
              <Link
                href={`/work/${project.slug}`}
                className="project-media-link"
                data-tilt
                aria-label={`View ${project.name} project`}
              >
                <ProjectArtwork project={project} />
              </Link>
              <div className="project-info">
                <p className="eyebrow project-category">{project.category}</p>
                <h3>
                  <Link href={`/work/${project.slug}`}>
                    {project.name}
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </Link>
                </h3>
                <p>{project.summary}</p>
                <div className="project-meta">
                  <Chips items={project.stack.slice(0, 4)} />
                  <span className="project-status">{project.status}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
