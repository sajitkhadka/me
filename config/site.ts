export const siteConfig = {
  name: "sajitkhadka.com",
  url: "https://sajitkhadka.com",
  description:
    "Sajit Khadka is a software engineer building integrations and event-driven backend systems. He runs a home Kubernetes cluster and writes about what he builds.",
  author: {
    name: "Sajit Khadka",
    title: "Software Engineer, Integrations",
    description:
      "I build integrations and event-driven backend systems, and I write about distributed systems, Kubernetes and the tools I build.",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/sajitkhadka/",
    x: "https://x.com/SajitKhadka",
    github: "https://github.com/sajitkhadka",
  },
};

export function ogImage(title: string, type: "home" | "blog" | "project" | "resume" | "about") {
  return `/api/og?title=${encodeURIComponent(title)}&type=${type}`;
}

export type SiteConfig = typeof siteConfig;
