import { Metadata } from "next";
import Link from "next/link";
import { ogImage } from "@/config/site";

const lastUpdated = "October 12, 2026";
const description = "What I am working on and learning right now.";

export const metadata: Metadata = {
  title: "Now",
  description,
  alternates: { canonical: "/now" },
  openGraph: {
    type: "website",
    title: "Now - Sajit Khadka",
    description,
    images: [ogImage("Now", "about")],
  },
};

const sections = [
  {
    heading: "Work",
    body: "Integrations engineering at Perceptyx: moving customer data onboarding from a manual process to event-driven pipelines on AWS.",
  },
  {
    heading: "Building at home",
    body: "Small tools on my home Kubernetes cluster: a shared schedule board (SyncToDo), a couples' task tracker (TickOff), a file organiser (FileKeeper) and an English speaking trainer. This site is next, with a refreshed portfolio and a move onto the cluster.",
  },
  {
    heading: "Learning",
    body: "More Go in production code, Terraform, and how to run reliable event-driven systems: retries, dead-letter queues and good alerts.",
  },
];

export default function NowPage() {
  return (
    <div className="container max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-bold">Now</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated {lastUpdated}</p>
      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="mt-2 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        This is a{" "}
        <a href="https://nownownow.com/about" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
          now page
        </a>
        . For the longer story, see <Link href="/about" className="underline underline-offset-4">About</Link>.
      </p>
    </div>
  );
}
