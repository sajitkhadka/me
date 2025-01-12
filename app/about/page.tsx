// import ParticlesAnimation from "@/components/animation/particles-animation";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Image from "next/image";
import { getAboutMe, getAuthor } from "./actions";
import { Article } from "@/components/layout/article";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const aboutMe = await getAboutMe();
  const { author, image, authorInfo } = await getAuthor();
  const authorName = author || "Sajit Khadka";
  const title = aboutMe?.title;
  const pageTitle = title ? `${title} - ${authorName}` : `About Me - ${authorName}`;

  return {
    title: pageTitle,
    description: authorInfo || "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts, and opinions on technology, development, and life.",
    openGraph: {
      type: "article",
      title: pageTitle,
      description: aboutMe?.title,
      images: [
        {
          url: `/api/image/${image}`,
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: aboutMe?.title,
      creator: "@sajitkhadka",
      images: [
        `/api/image/${image}`
      ],
    },
  };
}



function isValidURL(str: string) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}


export default async function AboutPage() {
  const aboutMe = await getAboutMe();
  const { author, image } = await getAuthor();
  const imageUrl = image ? isValidURL(image) ? image : absoluteUrl(`/api/image/${image}`) : null;

  return (
    <div className="container max-w-6xl py-3 lg:py-10">
      {/* <ParticlesAnimation /> */}
      <div className="relative z-10 pointer-events-none">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        </div>
        <div className="my-8" />
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="min-w-48 max-w-48 flex flex-col gap-2">
            <div className="rounded-lg">
              {imageUrl ? <Image src={imageUrl} alt={author || siteConfig.author.name} width={200} height={200} /> : null}
            </div>

            <h2 className="text-2xl font-bold text-center break-words">
              {author || siteConfig.author.name}
            </h2>
            <p className="text-muted-foreground text-center break-words">
              {aboutMe?.title || siteConfig.author.title}
            </p>
          </div>
          {aboutMe && <div className="text-md py-4 flex flex-col gap-4">
            <Article post={aboutMe} includeAuthor={false} />
          </div>}
        </div>
      </div>
    </div>
  );
}
