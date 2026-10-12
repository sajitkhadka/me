import { z } from "zod";

const resumeSchema = z.object({
  personal: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string().email(),
    linkedin: z.string().url().optional(),
    website: z.string().url().optional(),
    summary: z.string(),
  }),
  skills: z.record(z.array(z.string())),
  experiences: z.array(
    z.object({
      id: z.string(),
      company: z.string(),
      title: z.string(),
      location: z.string(),
      period: z.string(),
      description: z.string(),
      achievements: z.array(z.object({ text: z.string(), impact: z.string().optional() })),
      tech: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      field: z.string(),
      school: z.string(),
      location: z.string(),
      period: z.string(),
    }),
  ),
  coreExpertise: z.array(z.string()),
  footer: z.string(),
});

export type Resume = z.infer<typeof resumeSchema>;

// Edit this object to update /resume. A typo in the shape fails the build.
export const resume: Resume = resumeSchema.parse({
  personal: {
    name: "Sajit Khadka",
    title: "Software Engineer, Integrations",
    email: "sajitkhadka@gmail.com",
    linkedin: "https://linkedin.com/in/sajitkhadka",
    website: "https://sajitkhadka.com",
    summary: "Software engineer building integrations and event-driven backend systems on AWS and Kubernetes. Seven years across HR tech, fintech and SaaS."
  },
  skills: {
    "Languages & Frameworks": [
      "Go",
      "Node.js",
      "Java",
      "TypeScript",
      "Spring Boot",
      "NestJS",
      "Express",
      "React",
      "Next.js"
    ],
    "Data & Storage": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Snowflake"
    ],
    "Cloud & Infrastructure": [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Lambda",
      "SQS",
      "EC2",
      "Terraform"
    ],
    "Event Streaming": [
      "Apache Kafka",
      "AWS SQS",
      "Redis Pub/Sub",
      "Event-Driven Architecture"
    ],
    "DevOps & Monitoring": [
      "CI/CD",
      "GitOps",
      "Git",
      "Datadog",
      "SonarQube",
      "GitHub Actions",
      "Argo CD"
    ],
    "APIs & Protocols": [
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Webhooks",
      "Merge.dev",
      "Microservices"
    ]
  },
  experiences: [
    {
      id: "perceptyx",
      company: "Perceptyx",
      title: "Software Engineer, Integrations",
      location: "Remote",
      period: "April 2026 – Present",
      description: "Integrations team for an employee-survey platform, connecting customers' HR and recruiting systems",
      achievements: [
        {
          text: "Moving customer data onboarding from a manual, tool-driven process to event-driven webhooks",
          impact: "Faster onboarding"
        },
        {
          text: "Building ingestion on AWS Lambda and SQS with Merge.dev as the HRIS/ATS layer",
          impact: "Self-service setup"
        },
        {
          text: "Managing infrastructure as code with Terraform",
          impact: "Reviewed, repeatable changes"
        }
      ],
      tech: [
        "Go",
        "TypeScript",
        "AWS Lambda",
        "SQS",
        "Terraform",
        "Kubernetes",
        "Merge.dev",
        "Datadog"
      ]
    },
    {
      id: "rakuten",
      company: "Rakuten",
      title: "Software Engineer, Backend",
      location: "Toronto, Canada",
      period: "July 2025 – December 2025",
      description: "Backend services for financial products platform processing millions of transactions monthly",
      achievements: [
        {
          text: "Eliminated 100+ daily processing failures",
          impact: "99.9% reliability"
        },
        {
          text: "Reduced deployment cycle from weeks to hours",
          impact: "Feature flags & A/B testing"
        },
        {
          text: "Validated 10M+ records during card migration",
          impact: "Zero data loss"
        },
        {
          text: "Optimized Lambda handlers for 500K+ daily events",
          impact: "<100ms p95 latency"
        },
        {
          text: "Improved codebase maintainability",
          impact: "35% fewer bugs"
        }
      ],
      tech: [
        "Node.js",
        "Java",
        "Spring Boot",
        "TypeScript",
        "PostgreSQL",
        "Kafka",
        "Redis",
        "AWS",
        "Kubernetes",
        "Datadog"
      ]
    },
    {
      id: "guhuza",
      company: "Guhuza",
      title: "Senior Software Developer",
      location: "Toronto, Canada",
      period: "November 2021 – July 2025",
      description: "Backend architecture for AI-powered SaaS platform scaling to 100K+ active users",
      achievements: [
        {
          text: "Architected event-driven microservices with Kafka",
          impact: "60% throughput gain"
        },
        {
          text: "Built subscription engine with pricing tiers",
          impact: "40% LTV increase"
        },
        {
          text: "Integrated Stripe with idempotent webhooks",
          impact: "<1% payment failures"
        },
        {
          text: "Optimized MySQL queries and Redis caching",
          impact: "45% faster responses"
        },
        {
          text: "Deployed on Azure Kubernetes Service",
          impact: "99.95% uptime"
        }
      ],
      tech: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "MySQL",
        "Kafka",
        "Redis",
        "React",
        "Azure",
        "Kubernetes",
        "Stripe"
      ]
    },
    {
      id: "humber-instructor",
      company: "Humber College",
      title: "Instructor (Part-time)",
      location: "Toronto, Canada",
      period: "September 2023 – December 2024",
      description: "Taught Core Java, Spring Boot and Android development alongside a full-time engineering role",
      achievements: [
        {
          text: "Taught backend and mobile courses to students entering the industry",
          impact: "100+ students"
        }
      ],
      tech: [
        "Java",
        "Spring Boot",
        "Android"
      ]
    },
    {
      id: "omadatek",
      company: "Omadatek",
      title: "Full Stack Developer",
      location: "Toronto, Canada",
      period: "August 2020 – November 2021",
      description: "Full-stack applications for field service management serving 10K+ daily users",
      achievements: [
        {
          text: "Built admin portals with React and GraphQL",
          impact: "30% faster workflows"
        },
        {
          text: "Developed React Native mobile app",
          impact: "Real-time GPS tracking"
        },
        {
          text: "Designed Node.js APIs with MongoDB",
          impact: "RESTful & GraphQL"
        },
        {
          text: "Optimized GraphQL resolvers",
          impact: "40% response time cut"
        }
      ],
      tech: [
        "React",
        "React Native",
        "Node.js",
        "GraphQL",
        "MongoDB",
        "AWS",
        "Docker"
      ]
    },
    {
      id: "itglance",
      company: "ITGlance",
      title: "Software Developer",
      location: "Kathmandu, Nepal",
      period: "January 2017 – August 2018",
      description: "Enterprise web applications with Java backend and Angular frontend",
      achievements: [
        {
          text: "Built Spring Boot REST APIs",
          impact: "User management & reporting"
        },
        {
          text: "Designed MySQL schemas",
          impact: "Complex query optimization"
        },
        {
          text: "Implemented Spring Security",
          impact: "Role-based access control"
        }
      ],
      tech: [
        "Java",
        "Spring Boot",
        "Angular",
        "MySQL",
        "REST APIs"
      ]
    }
  ],
  education: [
    {
      degree: "Postgraduate Diploma",
      field: "Information Technology Solutions",
      school: "Humber College",
      location: "Toronto, Canada",
      period: "2019 – 2020"
    },
    {
      degree: "Bachelor of Engineering",
      field: "Electronics and Communication",
      school: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      period: "2011 – 2015"
    }
  ],
  coreExpertise: [
    "Integration Engineering",
    "Backend Engineering",
    "Distributed Systems",
    "Microservices",
    "Event-Driven Architecture",
    "Cloud Infrastructure",
    "Performance Optimization"
  ],
  footer: "Seven years building backend and integration systems"
});
