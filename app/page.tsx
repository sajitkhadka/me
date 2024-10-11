"use client"
import ParticlesAnimation from "@/components/particles-animation";
import TechIcon, { techStack } from "@/components/tech-icon/tech-icon";
import { buttonVariants } from "@/components/ui/button";
import userService from "@/db/user.service";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex-grow container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <ParticlesAnimation />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <section className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-balance">
                Hello, I am Sajit
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '2rem' }}
                transition={{ duration: 0.9, delay: 0.9 }}
                className="h-1 bg-gray-900"
              ></motion.div>
            </div>
            {/* <p className="text-muted-foreground leading-relaxed text-balance">
              Welcome to my blog. I&apos;m a software developer passionate about learning, coding, and sharing my journey.
            </p> */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-4 flex flex-col sm:flex-row gap-4 "
            >
              <Link
                href="/blog"
                className={cn(buttonVariants({ size: "sm", animation: "custom" }), "w-full sm:w-fit")}
              >
                Explore my blog
              </Link>

              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm", animation: "custom" }),
                  "w-full sm:w-fit"
                )}
              >
                About me
              </Link>
            </motion.div>
          </section>
          {/* <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-12 md:mt-0 md:w-1/2 relative h-[240px] w-[240px] hidden md:block"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              {techStack.map((tech, index) => (
                <TechIcon key={tech.name} name={tech.name} svg={tech.svg} index={index} total={techStack.length} />
              ))}
            </motion.div>
          </motion.section> */}
        </div>
      </main>
      {/* <section className="space-y-9 py-24 md:py-40">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            Hello, I&apos;m Sajit
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to my blog. I&apos;m a software developer passionate about learning, coding, and sharing my journey.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
            >
              View my blog
            </Link>
            <Link
              href="/about"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit"
              )}
            >
              About me
            </Link>
          </div>
        </div>
      </section> */}
      {/* <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map((post) => (
            post.published && (
              <li key={post.slug} className="first:border-t first:border-border">
                <PostItem
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                />
              </li>
            )
          ))}
        </ul>
      </section> */}
    </>
  );
}
