import blogPostService from "@/db/blogpost.service";
import { Metadata } from "next";
import { ogImage } from "@/config/site";
import Posts from "./posts";
import TagComponent from "./tags-sidebar";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes and write-ups by Sajit Khadka on distributed systems, Kubernetes, Postgres and the tools he builds.",
  openGraph: {
    type: "website",
    title: "Blog - Sajit Khadka",
    images: [ogImage("Blog", "blog")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Sajit Khadka",
    description:
      "Notes and write-ups by Sajit Khadka on distributed systems, Kubernetes, Postgres and the tools he builds.",
    images: [ogImage("Blog", "blog")],
    creator: "@sajitkhadka",
  },
};

export const POSTS_PER_PAGE = 10;

export interface BlogPageProps {
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
  const allPosts = await blogPostService.getAllBlogPosts(
    {
      limit: POSTS_PER_PAGE,
      offset: POSTS_PER_PAGE * (currentPage - 1),
    });
  const totalPages = Math.ceil(
    (await blogPostService.getBlogPostCount()) / POSTS_PER_PAGE
  );


  return (
    <div className="container flex flex-col-reverse max-w-6xl py-6 gap-10 lg:py-10 sm:grid sm:grid-cols-12">
      <div className="col-span-12 col-start-1 sm:col-span-9">
        <Posts
          displayPosts={allPosts}
          totalPages={totalPages}
        />
      </div>
      <TagComponent />
    </div>
  );
}
