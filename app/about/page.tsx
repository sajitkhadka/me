import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-4xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <Avatar className="h-48 w-48">
            <AvatarImage src="/sajit.jpg" alt={siteConfig.author} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Developer
          </p>
        </div>
        <p className="text-muted-foreground text-lg py-4 flex flex-col gap-10">
          <p>Welcome to my blog! I&apos;m Sajit Khadka, a passionate software developer with over 6 years of experience in full-stack development. My journey in tech has been marked by a love for learning, problem-solving, and building scalable, user-friendly applications. I&apos;ve had the privilege of working on a wide range of projects, from developing live video-calling features to designing enterprise-level software solutions.</p>

          <p> Aside from my software development career, I&apos;m also deeply interested in sharing my personal growth and learning experiences. On this blog, you&apos;ll find posts documenting my journey as an English as a Second Language (ESL) learner, insights into my fitness routine, and reflections on the ever-evolving world of technology.</p>

          <p>I believe in continuous improvement, whether it&apos;s mastering new tech stacks or pushing my limits in the gym. Whether you&apos;re here for tech insights or just curious about my personal stories, I hope you’ll find something helpful or inspiring. Thanks for stopping by—let’s learn and grow together! </p>
        </p>
      </div>
    </div>
  );
}
