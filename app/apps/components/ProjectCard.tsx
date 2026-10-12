import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/config/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { slug, name, tagline, stack, liveUrl, repoUrl, screenshot, caseStudy } =
    project;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-primary/40">
      {screenshot && (
        <Image
          src={screenshot}
          alt={`Screenshot of ${name}`}
          width={640}
          height={360}
          className="w-full border-b object-cover"
        />
      )}
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="text-lg font-semibold">
          {caseStudy ? (
            <Link href={`/projects/${slug}`} className="hover:underline">
              {name}
            </Link>
          ) : (
            name
          )}
        </h2>
        <p className="flex-1 text-sm text-muted-foreground">{tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((item) => (
            <Badge key={item} variant="secondary" className="font-normal">
              {item}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-1 text-sm">
          {caseStudy && (
            <Link href={`/projects/${slug}`} className="font-medium hover:underline">
              Case study
            </Link>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline"
            >
              <Github size={14} /> Repo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
