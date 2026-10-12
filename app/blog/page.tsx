import blogPostService from "@/db/blogpost.service";
import { Metadata } from "next";
import { ogImage } from "@/config/site";
import { externalPosts } from "@/config/writing";
import Posts from "./posts";
import TagComponent from "./tags-sidebar";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
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
  searchParams: Promise<{
    page?: string;
  }>;
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
  const currentPage = Number((await searchParams)?.page) || 1;
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
        <header className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">
            Write-ups on distributed systems, Postgres and Kubernetes, plus
            short notes on the tools I use and build.
          </p>
        </header>
        {currentPage === 1 && (
          <section className="mb-10 space-y-3">
            <h2 className="text-xl font-semibold">Recent write-ups</h2>
            <p className="text-sm text-muted-foreground">
              Longer posts, first published on my Confluence space.
            </p>
            <ul className="divide-y">
              {externalPosts.map((post) => (
                <li key={post.url} className="py-3">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-sm text-muted-foreground">{post.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <Posts
          displayPosts={allPosts}
          totalPages={totalPages}
        />
      </div>
      <TagComponent />
    </div>
  );
}
