import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { Terminal } from "@/components/home/terminal";
import { buttonVariants } from "@/components/ui/button";
import { ogImage } from "@/config/site";
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

async function getLatestPosts() {
  try {
    return await blogPostService.getLatestPosts(3);
  } catch (error) {
    console.error("Could not load latest posts", error);
    return [];
  }
}

function SectionHeading({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Link href={href} className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
        {cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const posts = await getLatestPosts();
  const row = "group grid gap-1 py-4 sm:grid-cols-[15rem_1fr_auto] sm:items-baseline sm:gap-6";

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] max-w-full -translate-x-1/2 animate-drift rounded-full bg-primary/[0.07] blur-[120px] motion-reduce:animate-none"
      />
      <div className="container relative mx-auto max-w-5xl space-y-20 px-4 py-20 sm:px-6 md:py-28">
        <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
         <div className="space-y-6">
          <h1 className="animate-fade-up text-3xl font-semibold leading-tight text-balance [animation-delay:80ms] sm:text-4xl">
            Hi, I&apos;m Sajit. I build the systems <span className="text-gradient">between systems</span>.
          </h1>
          <p className="animate-fade-up leading-relaxed text-muted-foreground [animation-delay:160ms]">
            Backend engineer on event-driven integrations: Kafka, Postgres and AWS at work, and a home k3s cluster where
            my own projects ship with a git tag.
          </p>
          <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Link href="/apps" className={cn(buttonVariants())}>Projects</Link>
            <Link href="/blog" className={cn(buttonVariants({ variant: "outline" }))}>Blog</Link>
            <Link href="/resume" className={cn(buttonVariants({ variant: "ghost" }))}>Resume</Link>
          </div>
         </div>
          <div className="animate-fade-up [animation-delay:200ms]">
            <Terminal
              projects={featuredProjects.map((p) => ({ title: p.name, href: `/projects/${p.slug}` }))}
              posts={posts.map((p) => ({ title: p.title, href: `/blog/${p.id}/${createSlug(p.title)}` }))}
            />
          </div>
        </section>

        <Reveal>
          <section className="space-y-4">
            <SectionHeading title="Projects" href="/apps" cta="All" />
            <ul className="divide-y divide-border/70 border-y border-border/70">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={row}>
                    <span className="font-medium transition-colors group-hover:text-primary">{project.name}</span>
                    <span className="text-sm text-muted-foreground">{project.tagline}</span>
                    <ArrowRight size={16} className="hidden text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:text-primary group-hover:opacity-100 sm:block" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {posts.length > 0 && (
          <Reveal>
            <section className="space-y-4">
              <SectionHeading title="Writing" href="/blog" cta="All" />
              <ul className="divide-y divide-border/70 border-y border-border/70">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.id}/${createSlug(post.title)}`} className={cn(row, "sm:grid-cols-[1fr_auto]")}>
                      <span className="font-medium transition-colors group-hover:text-primary">{post.title}</span>
                      <time dateTime={post.createdAt.toISOString()} className="text-sm text-muted-foreground">
                        {formatDate(post.createdAt.getTime())}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
}
