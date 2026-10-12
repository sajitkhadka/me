import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Underline from "@/components/custom-ui/underline";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ogImage, siteConfig } from "@/config/site";
import { featuredProjects } from "@/config/projects";
import blogPostService from "@/db/blogpost.service";
import { absoluteUrl, cn, createSlug, formatDate } from "@/lib/utils";

export const metadata = {
  alternates: { canonical: "/" },
  title: "Sajit Khadka",
  description:
    "Sajit Khadka is a software engineer building integrations and event-driven backend systems, and runs a home Kubernetes cluster for his own projects.",
  openGraph: {
    type: "website",
    title: "Sajit Khadka",
    images: [ogImage("Sajit Khadka", "home")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajit Khadka - Software Engineer",
    description:
      "Integrations and event-driven backend systems. Home Kubernetes cluster and side projects.",
    images: [ogImage("Sajit Khadka", "home")],
    creator: "@sajitkhadka",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.title,
  url: siteConfig.url,
  image: `${siteConfig.url}/avatar.webp`,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.x],
};

async function getLatestPosts() {
  try {
    return await blogPostService.getLatestPosts(3);
  } catch (error) {
    console.error("Could not load latest posts", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-14 md:pb-24 space-y-14">
      <section className="space-y-6">
        <Image
          src="/avatar.webp"
          alt="Illustrated portrait of Sajit"
          width={96}
          height={96}
          className="rounded-full border bg-muted"
          priority
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-balance">Hello, I am Sajit</h1>
          <Underline />
        </div>
        <p className="text-lg leading-relaxed">
          I build integrations and event-driven backend systems. Currently at
          Perceptyx, connecting customers&apos; HR and recruiting systems to an
          employee-survey platform. Outside work I run a home k3s cluster and
          build tools for myself.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={absoluteUrl("/apps")}
            className={cn(buttonVariants({ size: "sm", animation: "custom" }), "w-full sm:w-fit")}
          >
            See my projects
          </Link>
          <Link
            href={absoluteUrl("/blog")}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm", animation: "custom" }),
              "w-full sm:w-fit",
            )}
          >
            Explore my blog
          </Link>
          <Link
            href={absoluteUrl("/resume")}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm", animation: "custom" }),
              "w-full sm:w-fit",
            )}
          >
            Resume
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Not job-hunting, but happy to chat:{" "}
          <a href="mailto:sajitkhadka@gmail.com" className="underline underline-offset-4">
            sajitkhadka@gmail.com
          </a>
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Featured projects</h2>
          <Link href={absoluteUrl("/apps")} className="inline-flex items-center gap-1 text-sm hover:underline">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="transition-colors hover:border-primary/40">
              <CardContent className="space-y-3 p-5">
                <h3 className="font-semibold">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{project.tagline}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((item) => (
                    <Badge key={item} variant="secondary" className="font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Latest posts</h2>
            <Link href={absoluteUrl("/blog")} className="inline-flex items-center gap-1 text-sm hover:underline">
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <ul className="divide-y">
            {posts.map((post) => (
              <li key={post.id} className="py-3">
                <Link
                  href={absoluteUrl(`/blog/${post.id}/${createSlug(post.title)}`)}
                  className="font-medium hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-muted-foreground">{formatDate(post.createdAt.getTime())}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      </div>
    </>
  );
}
