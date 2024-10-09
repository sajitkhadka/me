import { notFound } from "next/navigation";

import { Tag } from "@/components/tag";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  // return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
  return [];
}

export default async function PostPage({ params }: PostPageProps) {
  const post: any = undefined
  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag: any) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
    </article>
  );
}
