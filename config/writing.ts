export type ExternalPost = {
  title: string;
  url: string;
  date: string;
  summary: string;
};

const space = "https://sajitkhadka.atlassian.net/wiki/spaces/~5e640d3f6736d60b4911badb/blog";

// Posts first published on Confluence, newest first.
export const externalPosts: ExternalPost[] = [
  {
    title: "Monitoring, Metrics, and Failure Handling in Distributed Systems",
    url: `${space}/2026/01/21/6062081/Monitoring+Metrics+and+Failure+Handling+in+Distributed+Systems`,
    date: "2026-01-21",
    summary: "The three pillars of observability, the golden signals, SLIs and SLOs, and alerting on symptoms instead of causes.",
  },
  {
    title: "Accessing a k3s Cluster from Windows and GitHub Actions Using a Service Account",
    url: `${space}/2026/01/21/2424911/Accessing+a+k3s+Kubernetes+Cluster+from+Windows+and+GitHub+Actions+Using+a+Service+Account`,
    date: "2026-01-21",
    summary: "A scoped service-account kubeconfig instead of the root-owned default.",
  },
  {
    title: "Why Your Postgres Database Might Suddenly Hit 250 Connections",
    url: `${space}/2026/01/22/6389761/Why+Your+Postgres+Database+Might+Suddenly+Hit+250+Connections+And+How+to+Fix+It`,
    date: "2026-01-22",
    summary: "Connection pools are per process: pod count times pool size, rolling updates and retry storms.",
  },
  {
    title: "Mastering K3s Deployment with GitHub Actions",
    url: `${space}/2026/01/03/2359404/Mastering+K3s+Deployment+with+GitHub+Actions+Troubleshooting+kubeconfig+Secrets+and+Robust+Workflows`,
    date: "2026-01-03",
    summary: "Self-hosted runners, kubeconfig secrets and the permission errors that come with them.",
  },
  {
    title: "PostgreSQL Docker Backup Script on Windows",
    url: `${space}/2025/12/29/2424869/PostgreSQL+Docker+Backup+Script+on+Windows`,
    date: "2025-12-29",
    summary: "PowerShell backups of a remote Docker Postgres, with rotation and retention.",
  },
]
  .sort((a, b) => b.date.localeCompare(a.date));
