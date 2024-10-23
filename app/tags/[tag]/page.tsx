// import { posts } from "#site/content";
import { POSTS_PER_PAGE } from "@/app/blog/page";
import Posts from "@/app/blog/posts";
import TagComponent from "@/app/blog/tags-sidebar";
import blogPostService from "@/db/blogpost.service";
import tagsService from "@/db/tags.service";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({
  params,
  searchParams
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

// export const generateStaticParams = async () => {
//   const tags = await tagsService.getAllTags();
//   const paths = tags.map((tag) => ({ tag: slug(tag.name) }));
//   return paths;
// };

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = params;
  const currentPage = Number(searchParams?.page) || 1;
  const _tag = tag.split('-').join(' ');
  const allPosts = await blogPostService.getBlogPostByTag(
    _tag,
    {
      limit: POSTS_PER_PAGE,
      offset: POSTS_PER_PAGE * (currentPage - 1),
    }
  );
  const totalPages = Math.ceil(
    (await blogPostService.getBlogPostCountByTag(_tag)) / 5
  );


  return (
    <div className="container flex flex-col-reverse max-w-6xl py-6 gap-10 lg:py-10 sm:grid sm:grid-cols-12">
      <div className="col-span-12 col-start-1 sm:col-span-9">
        <Posts
          displayPosts={allPosts}
          totalPages={totalPages}
        />
      </div>

      <TagComponent tagparam={tag} />
    </div>
  );
}
