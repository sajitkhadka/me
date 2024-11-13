'use server'
import blogPostService from "@/db/blogpost.service";
import { BlogPostType } from "@/db/types";
import userService from "@/db/user.service";

export const getAuthor = async () => {
    const admin = await userService.fetchAdmin();
    return {
        // description: admin?.description?.replace(/\\n/g, '<br />'),
        authorInfo: admin?.authorInfo,
        image: admin?.image, author: admin?.name,
        title: admin?.title
    };
}

export const getAboutMe = async () => {
    return await blogPostService.getPostByType(BlogPostType.About);
}