// import { posts } from "#site/content";
import { PostItem } from "@/app/blog/post-item";
import Posts from "@/app/blog/posts";
import TagComponent from "@/app/blog/TagsComponent";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import blogPostService from "@/db/blogpost.service";
import tagsService from "@/db/tags.service";
import { sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}

export const generateStaticParams = async () => {
  const tags = await tagsService.getAllTags();
  const paths = tags.map((tag) => ({ tag: slug(tag.name) }));
  return paths;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");
  const allPosts = await blogPostService.getBlogPostByTag(tag);
  const displayPosts = allPosts.filter(post => post.published);
  const tags = await tagsService.getAllTags();
  const sortedTags = sortTagsByCount(tags);
  const totalPages = Math.ceil(allPosts.length / 5);

  return (
    <div className="container flex flex-col-reverse max-w-6xl py-6 gap-10 lg:py-10 sm:grid sm:grid-cols-12">
      <div className="col-span-12 col-start-1 sm:col-span-9">
        <Posts
          displayPosts={displayPosts}
          totalPages={totalPages}
        />
      </div>

      <TagComponent sortedTags={sortedTags} tagparam={tag} />
    </div>
  );
}
