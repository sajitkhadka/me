import { PostItem } from "@/app/blog/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/custom-ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import blogPostService from "@/db/blogpost.service";
import { getAllTags, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";
import tagService from "@/db/tags.service";
import Posts from "./posts";
import TagComponent from "./tags-sidebar";

export const metadata: Metadata = {
  title: "Sajit Khadka's Blog",
  description:
    "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts and opinions on technology, development and life.",
  openGraph: {
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajit Khadka's Blog",
    description:
      "Personal blog of Sajit Khadka, a software engineer and web developer. He writes about his experiences, thoughts and opinions on technology, development and life.",
    images: ["https://sajit.me/images/sajit-khadka.jpg"],
    creator: "@sajitkhadka",
  },
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

/**
 * The blog page displays a paginated list of blog posts, with a maximum of
 * `POSTS_PER_PAGE` posts per page. It also includes a list of all tags, sorted
 * by count, and a pagination component to navigate between pages.
 *
 * @param {{ searchParams: { page?: string } }} props The page number to display
 * @returns {JSX.Element} The blog page component
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const allPosts = await blogPostService.getAllBlogPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const displayPosts = allPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = await tagService.getAllTags();

  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container flex flex-col-reverse max-w-6xl py-6 gap-10 lg:py-10 sm:grid sm:grid-cols-12">
      <div className="col-span-12 col-start-1 sm:col-span-9">
        <Posts
          displayPosts={displayPosts}
          totalPages={totalPages}
        />
      </div>
      <TagComponent sortedTags={sortedTags} />
    </div>
  );
}
