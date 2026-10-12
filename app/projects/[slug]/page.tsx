import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ogImage } from "@/config/site";
import { getProject, projects } from "@/config/projects";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project?.caseStudy) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: { type: "article", title: project.name, description: project.tagline, images: [ogImage(project.name, "project")] },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project?.caseStudy) notFound();
  const { name, tagline, stack, liveUrl, repoUrl, caseStudy } = project;

  return (
    <article className="container max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/apps"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={14} /> All projects
      </Link>
      <h1 className="text-3xl font-bold text-balance">{name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {stack.map((item) => (
          <Badge key={item} variant="secondary" className="font-normal">
            {item}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <ExternalLink size={14} /> Live
          </a>
        )}
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
            <Github size={14} /> Repo
          </a>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">The problem</h2>
        <p className="mt-2 leading-relaxed">{caseStudy.problem}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed">
          {caseStudy.approach.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">A decision: {caseStudy.decision.title}</h2>
        <p className="mt-2 leading-relaxed">{caseStudy.decision.why}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">What was hard</h2>
        <p className="mt-2 leading-relaxed">{caseStudy.hard}</p>
      </section>
    </article>
  );
}
