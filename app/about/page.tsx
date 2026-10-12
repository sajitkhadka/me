import { Metadata } from "next";
import { AvatarIllustration } from "@/components/custom-ui/avatar-illustration";
import Link from "next/link";
import { siteConfig, ogImage } from "@/config/site";

const title = "About";
const socialTitle = `About ${siteConfig.author.name}`;
const description =
  "Software engineer on an integrations team, building event-driven backend systems and running a home Kubernetes cluster.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: socialTitle,
    description,
    images: [ogImage(socialTitle, "about")],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
    creator: "@sajitkhadka",
    images: [ogImage(socialTitle, "about")],
  },
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl px-4 py-10 lg:py-16">
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="flex w-48 min-w-48 flex-col items-center gap-2">
          <AvatarIllustration
            title={`Illustrated portrait of ${siteConfig.author.name}`}
            className="h-48 w-48 rounded-full border shadow-[0_20px_60px_-30px_hsl(var(--primary)/0.5)]"
          />
          <h1 className="text-center text-2xl font-bold">{siteConfig.author.name}</h1>
          <p className="text-center text-muted-foreground">{siteConfig.author.title}</p>
        </div>

        <div className="space-y-4 leading-relaxed">
          <p>
            I am a software engineer on the integrations team at Perceptyx. We connect
            customers&apos; HR and recruiting systems to an employee-survey platform, moving
            from manual onboarding to event-driven pipelines on AWS.
          </p>
          <p>
            Before that I spent seven years on backend and full-stack work: Kafka-based
            services in fintech, a hiring-platform SaaS with live video interviews and
            billing, and web apps for a staffing agency. I also taught Java, Spring Boot
            and Android as a part-time college instructor.
          </p>
          <p>
            At home I run a small Kubernetes cluster that hosts my own projects, released by
            pushing a git tag. I write about distributed systems, Postgres, Kubernetes and
            the tools I build for myself.
          </p>
          <p>
            Read the{" "}
            <Link href="/resume" className="underline underline-offset-4">resume</Link>, browse the{" "}
            <Link href="/apps" className="underline underline-offset-4">projects</Link>, or find me on{" "}
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">GitHub</a>{" "}
            and{" "}
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">LinkedIn</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
