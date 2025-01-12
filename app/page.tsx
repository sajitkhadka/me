import Underline from "@/components/custom-ui/underline";
// import ParticlesAnimation from "@/components/animation/particles-animation";
import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Sajit Khadka",
  description:
    "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts and opinions on technology, development and life.",
  openGraph: {
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajit Khadka - Blog of a software engineer and web developer",
    description:
      "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts and opinions on technology, development and life.",
    images: ["https://sajit.me/avatar.png"],
    creator: "@sajitkhadka",
  },
};

export default function Home() {
  return (
    <>
      <main className="flex-grow container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="relative z-0 flex flex-col md:flex-row justify-between items-center pointer-events-none">
          <section className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-balance">
                Hello, I am Sajit
              </h1>
              <Underline />
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <Link
                href={absoluteUrl("/blog")}
                className={cn(buttonVariants({ size: "sm", animation: "custom" }), "w-full sm:w-fit")}
              >
                Explore my blog
              </Link>
              <Link
                href={absoluteUrl("/apps")}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm", animation: "custom" }),
                  "w-full sm:w-fit"
                )}
              >
                Visit my Apps Store
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
