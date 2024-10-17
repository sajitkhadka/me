import ParticlesAnimation from "@/components/animation/particles-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me - Sajit Khadka",
  description: "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts and opinions on technology, development and life.",
  openGraph: {
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me - Sajit Khadka",
    description:
      "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts and opinions on technology, development and life.",
    images: [siteConfig.avatarUrl],
    creator: "@sajitkhadka",
  },
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <ParticlesAnimation />
      <div className="relative z-10 pointer-events-none">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-x-4">
            <h1 className="inline-block font-bold text-2xl lg:text-2xl">
              About Me
            </h1>
          </div>
        </div>
        <hr className="my-8" />
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="min-w-48 max-w-48 flex flex-col gap-2">
            <Image src="/avatar.png" alt={siteConfig.author} width={200} height={200} />
            <h2 className="text-2xl font-bold text-center break-words">
              {siteConfig.author}
            </h2>
            <p className="text-muted-foreground text-center break-words">
              Software Developer
            </p>
          </div>
          <div className="text-md py-4 flex flex-col gap-10">
            {/* <p>Welcome to my blog! I&apos;m Sajit Khadka, a passionate software developer with over 6 years of experience in full-stack development. My journey in tech has been marked by a love for learning, problem-solving, and building scalable, user-friendly applications. I&apos;ve had the privilege of working on a wide range of projects, from developing live video-calling features to designing enterprise-level software solutions.</p>
          <p> Aside from my software development career, I&apos;m also deeply interested in sharing my personal growth and learning experiences. On this blog, you&apos;ll find posts documenting my journey as an English as a Second Language (ESL) learner, insights into my fitness routine, and reflections on the ever-evolving world of technology.</p>
          <p>I believe in continuous improvement, whether it&apos;s mastering new tech stacks or pushing my limits in the gym. Whether you&apos;re here for tech insights or just curious about my personal stories, I hope you’ll find something helpful or inspiring. Thanks for stopping by—let’s learn and grow together! </p> */}
            <p>Hi, I’m Sajit Khadka! I’m a passionate software developer who loves bringing ideas to life through code.</p>
            <p>When I&apos;m not immersed in tech, you&apos;ll likely find me binge-watching the latest TV shows or anime, reading or trying out new hobbies. Fitness is important to me, and I enjoy working out regularly to stay in shape.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
