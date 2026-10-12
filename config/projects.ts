export type CaseStudy = {
  problem: string;
  approach: string[];
  decision: { title: string; why: string };
  hard: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string[];
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  screenshot?: string;
  caseStudy?: CaseStudy;
};

// Order here is the order shown on /apps. Every liveUrl was opened on 2026-10-12.
export const projects: Project[] = [
  {
    slug: "home-k3s-platform",
    name: "Home k3s platform",
    tagline:
      "A one-node Kubernetes cluster that runs all my apps, deployed by pushing a git tag.",
    stack: ["k3s", "Argo CD", "Cloudflare Tunnel", "Sealed Secrets", "GitHub Actions"],
    featured: true,
    caseStudy: {
      problem:
        "I kept building small apps that only ran on my laptop. I wanted one place to host them, with the same release step for every app, and without opening a port on my home router.",
      approach: [
        "One k3s cluster with one namespace per app. Every app has the same few manifests: namespace, config, secret, deployment, service.",
        "Public traffic comes in through a Cloudflare Tunnel that dials out from the cluster, so no public DNS record points at my home IP.",
        "Releasing is `git tag vX.Y.Z && git push`. A GitHub Actions job on a self-hosted runner builds the image and writes its commit SHA into the manifest in a separate config repo.",
        "Argo CD watches that config repo and syncs the change into the cluster. CI never talks to the cluster.",
        "Secrets are committed only as sealed secrets. Metrics, logs, uptime probes and analytics run in their own namespace.",
      ],
      decision: {
        title: "Images are pinned to the commit SHA in a separate config repo",
        why: "The config repo is the single record of what should be running. A rollback is a git revert, and nobody can bump a version by hand and forget to commit it.",
      },
      hard:
        "Cloudflare becomes a single point of failure for every public host, and the cluster is on a home connection. I accepted that for personal projects and cover it with caching for the pages that matter.",
    },
  },
  {
    slug: "sync-todo",
    name: "SyncToDo",
    tagline:
      "A shared schedule and to-do board where several people see changes live, with an MCP server so an AI assistant can use it too.",
    stack: ["Go", "Gin", "WebSocket", "Next.js", "PostgreSQL", "MCP"],
    featured: true,
    liveUrl: "https://synctodo.sajitkhadka.com",
    caseStudy: {
      problem:
        "Planning a day with someone else usually means a chat thread and a calendar that disagree. I wanted one board both people edit, where a change shows up on the other screen straight away.",
      approach: [
        "A Go backend with a WebSocket hub: each client joins a schedule, and every change is broadcast to the others on it.",
        "A Next.js frontend. Schedule times are kept in UTC and shown in the browser's time zone, so people in different zones see the same slot.",
        "Sharing is permission-based, and people sign in with Google and are invited by email.",
        "A separate Go MCP server lets an AI client read and change a person's schedule on their behalf, using that person's own login.",
        "Dev and prod run in separate namespaces. The project has 30+ written decision records.",
      ],
      decision: {
        title: "Start with an in-memory store behind an interface, move to Postgres later",
        why: "The first version kept everything in memory so the data model was cheap to change. Handlers only called typed store methods, so SQLite and then Postgres could be swapped in without touching them.",
      },
      hard:
        "Daylight saving time. The hour that repeats when clocks go back makes wall-clock times ambiguous, so it has its own decision record and tests.",
    },
  },
  {
    slug: "english-communication-trainer",
    name: "English Communication Trainer",
    tagline:
      "Record yourself speaking, get a transcript and measured speech stats on your own GPU, then feedback from Claude.",
    stack: ["Python", "WhisperX", "Silero VAD", "SQLite", "React", "Claude Code"],
    featured: true,
    repoUrl: "https://github.com/sajitkhadka/english-communication-trainer",
    caseStudy: {
      problem:
        "Practising spoken English alone has no feedback loop. Apps either score pronunciation and nothing else, or send my audio to a service I do not control.",
      approach: [
        "Record in the browser. The backend transcribes with WhisperX on a local GPU and finds word timings, pauses and filler words.",
        "All the numbers are computed in code, not by a model: words per minute, pause map, filler counts, target-word matches, a weighted score. Re-running a session gives the same numbers.",
        "Claude only does the judgement part, working from the pre-computed summary instead of raw audio, which keeps the token cost low.",
        "Vocabulary to practise is scheduled with spaced repetition.",
      ],
      decision: {
        title: "Hand work to Claude through a queue, not an API call",
        why: "Pressing Process marks a session as pending and transcribes it. I then run one command in Claude Code, which works through every pending session. The app holds no API key and a web page never calls a model.",
      },
      hard:
        "Whisper-style models tidy up speech and drop filler words, so a transcript alone says the delivery is cleaner than it is. A separate voice-activity pass (Silero) measures silence from the audio and is compared with the transcript.",
    },
  },
  {
    slug: "filekeeper",
    name: "FileKeeper",
    tagline:
      "Finds duplicates and wasted space across your drives and proposes a cleaner folder structure. It only changes files you approve.",
    stack: ["Go", "SQLite", "React"],
    featured: true,
    caseStudy: {
      problem:
        "Years of copies across several drives, with no safe way to tell which files are duplicates and no wish to let a script delete things on its own.",
      approach: [
        "A scanner reads files read-only and builds an index in SQLite. Hashing is lazy: a file is hashed only if another file has the same size, or it is small.",
        "A planning layer produces plans as JSON. It never performs actions.",
        "The only part that writes is an executor that runs an approved plan. Deleted files go to a quarantine folder with a retention period, and each step is journaled.",
        "The dashboard is a React app embedded in a single Go binary. It listens on loopback only and makes no outbound network calls.",
      ],
      decision: {
        title: "Plan, approve, execute, with a journal",
        why: "Separating proposing from doing means I can read exactly what will happen first, and deleted files sit in quarantine until their retention period ends.",
      },
      hard:
        "Hashing every file on multi-terabyte drives is hours of disk reads. Hashing only same-size candidates, and comparing the first 256 KiB of large files before reading them whole, avoids most of it.",
    },
  },
  {
    slug: "tickoff",
    name: "TickOff",
    tagline:
      "A to-do list for a couple's life: one line to add a task, points for finishing it, and a view of each other's day.",
    stack: ["Go", "Next.js", "PostgreSQL", "MCP"],
    liveUrl: "https://tickoff.sajitkhadka.com",
  },
  {
    slug: "ai-interview-coach",
    name: "AI Interview Coach",
    tagline:
      "Records an interview, transcribes it locally, separates the speakers and gives coaching feedback on filler words and answer length.",
    stack: ["Go", "Python", "FastAPI", "Whisper", "React"],
  },
  {
    slug: "job-quest",
    name: "Job Quest",
    tagline: "Tracks job applications and where each one stands.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    liveUrl: "https://jobquest.sajitkhadka.com",
  },
  {
    slug: "leet-sensei",
    name: "Leet Sensei",
    tagline: "Suggests the next LeetCode problem to practise.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    liveUrl: "https://leetsensei.sajitkhadka.com",
  },
  {
    slug: "java-sandbox",
    name: "Java Sandbox",
    tagline: "A free online Java compiler and a one-call JSON API to run a snippet.",
    stack: ["Java 21", "Spring Boot", "Docker", "CodeMirror"],
    liveUrl: "https://java-sandbox.sajitkhadka.com",
    repoUrl: "https://github.com/sajitkhadka/java-compiler-sandbox",
  },
  {
    slug: "go-sandbox",
    name: "Go Sandbox",
    tagline:
      "An online Go compiler that builds and runs code in locked-down containers.",
    stack: ["Go", "Docker"],
    liveUrl: "https://go-sandbox.sajitkhadka.com",
  },
  {
    slug: "polyglot-primer",
    name: "Polyglot Primer",
    tagline:
      "Go, Java, JavaScript and Python side by side, for people who already program in one of them.",
    stack: ["Markdown", "Go", "Java", "JavaScript", "Python"],
    liveUrl: "https://primer.sajitkhadka.com",
    repoUrl: "https://github.com/sajitkhadka/polyglot-primer",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
