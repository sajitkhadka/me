import ParticlesAnimation from "@/components/animation/particles-animation";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Image from "next/image";
import { getAboutMe } from "./actions";

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
    images: [siteConfig.author.avatarUrl],
    creator: "@sajitkhadka",
  },
};

function isValidURL(str: string) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}


export default async function AboutPage() {
  const { description, image, author, title } = await getAboutMe();
  return (
    <div className="container max-w-6xl py-3 lg:py-10">
      <ParticlesAnimation />
      <div className="relative z-10 pointer-events-none">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        </div>
        <div className="my-8" />
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="min-w-48 max-w-48 flex flex-col gap-2">
            <div className="rounded-lg">
              <Image src={image ? isValidURL(image) ? image : `/api/image/${image}` : siteConfig.author.avatarUrl} alt={author || siteConfig.author.name} width={200} height={200} />
            </div>

            <h2 className="text-2xl font-bold text-center break-words">
              {author || siteConfig.author.name}
            </h2>
            <p className="text-muted-foreground text-center break-words">
              {title || siteConfig.author.title}
            </p>
          </div>
          <div className="text-md py-4 flex flex-col gap-4">
            <p dangerouslySetInnerHTML={{ __html: description || siteConfig.author.description }} />
          </div>
        </div>
      </div>
    </div>
  );
}
