import Underline from "@/components/custom-ui/underline";
// import ParticlesAnimation from "@/components/animation/particles-animation";
import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
    images: ["https://sajitkhadka.com/avatar.png"],
    creator: "@sajitkhadka",
  },
};

export default function Home() {
  return (
    <>
      <main className="flex-grow container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="relative z-0 flex flex-col md:flex-row justify-between items-center pointer-events-none">
          <section className="space-y-8 w-full">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-balance">
                Hello, I am Sajit
              </h1>
              <Underline />
            </div>

            {/* Open to Opportunities Card */}
            <Card className="pointer-events-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/40">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
                      <div className="relative bg-primary/10 rounded-full p-3 backdrop-blur-sm">
                        <svg
                          className="w-6 h-6 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-semibold">
                        Open to New Opportunities
                      </h2>
                      <Badge className="animate-pulse bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20 hover:bg-green-500/20">
                        Available Now
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      I&apos;m actively seeking a{" "}
                      <span className="font-medium text-foreground">
                        Senior Software Engineering
                      </span>{" "}
                      position where I can contribute my expertise and passion
                      for building exceptional products. If you&apos;re looking
                      for someone who brings both technical depth and genuine
                      enthusiasm to their work,
                      <span className="font-medium text-foreground">
                        {" "}
                        let&apos;s connect
                      </span>
                      !
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href={absoluteUrl("/resume")}
                        className={cn(
                          buttonVariants({ size: "sm", animation: "custom" }),
                          "w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow",
                        )}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        View My Resume
                      </Link>
                      <a
                        href="mailto:sajitkhadka@gmail.com"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "sm",
                            animation: "custom",
                          }),
                          "w-full sm:w-auto",
                        )}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Get in Touch
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 pointer-events-auto">
              <Link
                href={absoluteUrl("/blog")}
                className={cn(
                  buttonVariants({ size: "sm", animation: "custom" }),
                  "w-full sm:w-fit",
                )}
              >
                Explore my blog
              </Link>
              <Link
                href={absoluteUrl("/apps")}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                    animation: "custom",
                  }),
                  "w-full sm:w-fit",
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
