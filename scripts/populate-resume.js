/**
 * Script to populate resume data for the admin user
 * Run this script to set up your resume data in the database
 *
 * Usage: node scripts/populate-resume.js
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resumeData = {
  personal: {
    name: "Sajit Khadka",
    title: "Senior Software Engineer",
    email: "sajitkhadka@gmail.com",
    phone: "437-219-7807",
    location: "Toronto, Canada",
    linkedin: "https://linkedin.com/in/sajitkhadka",
    website: "https://sajitkhadka.com",
    summary:
      "Building scalable backend systems and distributed applications. Specialized in event-driven architectures and cloud-native solutions.",
  },
  stats: [
    { label: "Years Experience", value: "7+", delay: 0 },
    { label: "Users Impacted", value: "100K+", delay: 100 },
    { label: "Avg Performance Gain", value: "45%", delay: 200 },
    { label: "System Uptime", value: "99.9%", delay: 300 },
  ],
  skills: {
    "Languages & Frameworks": [
      "Node.js",
      "Java",
      "TypeScript",
      "Spring Boot",
      "NestJS",
      "Express",
      "React",
      "Next.js",
    ],
    "Data & Storage": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Snowflake"],
    "Cloud & Infrastructure": [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Lambda",
      "EC2",
    ],
    "Event Streaming": [
      "Apache Kafka",
      "Redis Pub/Sub",
      "Event-Driven Architecture",
    ],
    "DevOps & Monitoring": [
      "CI/CD",
      "Git",
      "Datadog",
      "SonarQube",
      "GitHub Actions",
    ],
    "APIs & Protocols": ["REST APIs", "GraphQL", "WebSockets", "Microservices"],
  },
  experiences: [
    {
      id: "rakuten",
      company: "Rakuten",
      title: "Senior Software Engineer",
      location: "Toronto, Canada",
      period: "July 2024 – Present",
      description:
        "Backend services for financial products platform processing millions of transactions monthly",
      achievements: [
        {
          text: "Eliminated 100+ daily processing failures",
          impact: "99.9% reliability",
        },
        {
          text: "Reduced deployment cycle from weeks to hours",
          impact: "Feature flags & A/B testing",
        },
        {
          text: "Validated 10M+ records during card migration",
          impact: "Zero data loss",
        },
        {
          text: "Optimized Lambda handlers for 500K+ daily events",
          impact: "<100ms p95 latency",
        },
        { text: "Improved codebase maintainability", impact: "35% fewer bugs" },
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
        "Datadog",
      ],
    },
    {
      id: "guhuza",
      company: "Guhuza",
      title: "Senior Software Engineer",
      location: "Toronto, Canada",
      period: "November 2021 – July 2024",
      description:
        "Backend architecture for AI-powered SaaS platform scaling to 100K+ active users",
      achievements: [
        {
          text: "Architected event-driven microservices with Kafka",
          impact: "60% throughput gain",
        },
        {
          text: "Built subscription engine with pricing tiers",
          impact: "40% LTV increase",
        },
        {
          text: "Integrated Stripe with idempotent webhooks",
          impact: "<1% payment failures",
        },
        {
          text: "Optimized MySQL queries and Redis caching",
          impact: "45% faster responses",
        },
        {
          text: "Deployed on Azure Kubernetes Service",
          impact: "99.95% uptime",
        },
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
        "Stripe",
      ],
    },
    {
      id: "omadatek",
      company: "Omadatek",
      title: "Full Stack Developer",
      location: "Toronto, Canada",
      period: "August 2020 – November 2021",
      description:
        "Full-stack applications for field service management serving 10K+ daily users",
      achievements: [
        {
          text: "Built admin portals with React and GraphQL",
          impact: "30% faster workflows",
        },
        {
          text: "Developed React Native mobile app",
          impact: "Real-time GPS tracking",
        },
        {
          text: "Designed Node.js APIs with MongoDB",
          impact: "RESTful & GraphQL",
        },
        {
          text: "Optimized GraphQL resolvers",
          impact: "40% response time cut",
        },
      ],
      tech: [
        "React",
        "React Native",
        "Node.js",
        "GraphQL",
        "MongoDB",
        "AWS",
        "Docker",
      ],
    },
    {
      id: "itglance",
      company: "ITGlance",
      title: "Software Developer",
      location: "Kathmandu, Nepal",
      period: "January 2017 – August 2018",
      description:
        "Enterprise web applications with Java backend and Angular frontend",
      achievements: [
        {
          text: "Built Spring Boot REST APIs",
          impact: "User management & reporting",
        },
        {
          text: "Designed MySQL schemas",
          impact: "Complex query optimization",
        },
        {
          text: "Implemented Spring Security",
          impact: "Role-based access control",
        },
      ],
      tech: ["Java", "Spring Boot", "Angular", "MySQL", "REST APIs"],
    },
  ],
  education: [
    {
      degree: "Postgraduate Diploma",
      field: "Information Technology Solutions",
      school: "Humber College",
      location: "Toronto, Canada",
      period: "2019 – 2020",
    },
    {
      degree: "Bachelor of Engineering",
      field: "Electronics and Communication",
      school: "Tribhuvan University",
      location: "Kathmandu, Nepal",
      period: "2011 – 2015",
    },
  ],
  coreExpertise: [
    "Backend Engineering",
    "Distributed Systems",
    "Microservices",
    "Event-Driven Architecture",
    "Cloud Infrastructure",
    "Performance Optimization",
  ],
  footer:
    "Open to exciting opportunities in backend engineering and distributed systems",
};

async function main() {
  console.log("Searching for admin user...");

  const adminUser = await prisma.user.findFirst({
    where: {
      role: "admin",
    },
  });

  if (!adminUser) {
    console.error("No admin user found. Please create an admin user first.");
    process.exit(1);
  }

  console.log(
    `Found admin user: ${adminUser.name || adminUser.email || adminUser.id}`
  );
  console.log("Updating resume data...");

  await prisma.user.update({
    where: {
      id: adminUser.id,
    },
    data: {
      resume: JSON.stringify(resumeData),
    },
  });

  console.log("✅ Resume data successfully populated!");
  console.log("You can now view your resume at /resume");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
