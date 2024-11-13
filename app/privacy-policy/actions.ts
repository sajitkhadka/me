import blogPostService from "@/db/blogpost.service";
import { BlogPostType } from "@/db/types";


export async function getPrivacyPolicy() {
    try {
        const privacyPolicy = await blogPostService.getPostByType(BlogPostType.PrivacyPolicy);
        return privacyPolicy;
    } catch (error) {
        console.error('Error fetching privacy policy:', error);
        throw new Error('Failed to fetch privacy policy.');
    }
}