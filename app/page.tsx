import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import SignalField from "@/components/animation/signal-field";
import { HeroTerminal } from "@/components/home/hero-terminal";
import { buttonVariants } from "@/components/ui/button";
import { ogImage, siteConfig } from "@/config/site";
import { featuredProjects } from "@/config/projects";
import blogPostService from "@/db/blogpost.service";
import { cn, createSlug, formatDate } from "@/lib/utils";

export const metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "Sajit Khadka | Software Engineer, Integrations and Backend Systems" },
  description:
    "Sajit Khadka is a software engineer building integrations and event-driven backend systems, and runs a home Kubernetes cluster for his own projects.",
  openGraph: {
    type: "website",
    title: "Sajit Khadka | Software Engineer",
    description:
      "Integrations and event-driven backend systems, a home Kubernetes cluster, and notes on what I build.",
    images: [ogImage("Sajit Khadka", "home")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajit Khadka | Software Engineer",
    description:
      "Integrations and event-driven backend systems. Home Kubernetes cluster and side projects.",
    images: [ogImage("Sajit Khadka", "home")],
    creator: "@sajitkhadka",
  },
};

const stack = ["Java", "Spring Boot", "Go", "Kafka", "PostgreSQL", "AWS", "Kubernetes", "Argo CD", "Next.js", "TypeScript", "MCP"];

async function getLatestPosts() {
  try {
    return await blogPostService.getLatestPosts(3);
  } catch (error) {
    console.error("Could not load latest posts", error);
    return [];
  }
}

function SectionHeading({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1.5">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      </div>
      <Link href={href} className="group inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
        {cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <>
      <section className="relative overflow-hidden">
        <SignalField className="pointer-events-none absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_75%_80%_at_50%_30%,#000_30%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[110px]" />

        <div className="container relative mx-auto grid max-w-5xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> integrations @ Perceptyx
            </p>
            <h1 className="text-4xl font-bold leading-[1.08] text-balance sm:text-5xl lg:text-[3.5rem] animate-fade-up [animation-delay:80ms]">
              Hi, I&apos;m Sajit.<br className="hidden sm:block" /> I&nbsp;build the systems <span className="text-gradient">between systems</span>.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-up [animation-delay:160ms]">
              Backend engineer on event-driven integrations: Kafka, Postgres and AWS at work, and a home k3s
              cluster where my own projects ship with a git tag.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row animate-fade-up [animation-delay:240ms]">
              <Link href="/apps" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                See my projects <ArrowRight size={16} />
              </Link>
              <Link href="/blog" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                Read the blog
              </Link>
              <Link href="/resume" className={cn(buttonVariants({ size: "lg", variant: "ghost" }), "gap-2")}>
                <FileText size={16} /> Resume
              </Link>
            </div>
          </div>

          <HeroTerminal />
        </div>

        <div className="relative border-y border-border/70 bg-card/30 py-4 backdrop-blur-sm [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm text-muted-foreground motion-reduce:animate-none" aria-hidden="true">
            {[...stack, ...stack].map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                {item} <span className="text-primary/60">/</span>
              </span>
            ))}
          </div>
          <p className="sr-only">Tools I work with: {stack.join(", ")}.</p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl space-y-20 px-4 py-20 sm:px-6">
        <section className="space-y-8">
          <SectionHeading eyebrow="Selected work" title="Projects" href="/apps" cta="All projects" />
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="surface surface-hover group flex flex-col gap-4 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((item) => (
                    <li key={item} className="rounded-md border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section className="space-y-8">
            <SectionHeading eyebrow="Writing" title="Latest posts" href="/blog" cta="All posts" />
            <ul className="divide-y divide-border/70 overflow-hidden rounded-xl border bg-card/50">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.id}/${createSlug(post.title)}`}
                    className="group flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-accent/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-medium group-hover:text-primary">{post.title}</span>
                    <time dateTime={post.createdAt.toISOString()} className="shrink-0 font-mono text-xs text-muted-foreground">
                      {formatDate(post.createdAt.getTime())}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="surface relative overflow-hidden p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-primary/15 blur-[80px]" />
          <div className="relative space-y-4">
            <h2 className="text-2xl font-semibold sm:text-3xl">Building something with events and APIs?</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              Not job-hunting, but I am happy to talk about integrations, Kubernetes at home, or anything on this site.
            </p>
            <a href="mailto:sajitkhadka@gmail.com" className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
              sajitkhadka@gmail.com
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
