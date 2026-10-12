import blogPostService from "@/db/blogpost.service";
import BlogPostForm from "../../blog-post-form";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
    const postId = (await params).id;

    const post = await blogPostService.getBlogPostById(parseInt(postId));
    return <BlogPostForm post={post} />;
}