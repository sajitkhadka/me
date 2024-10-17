'use server'

import blogPostService from '@/db/blogpost.service';
import tagService from '@/db/tags.service';

export interface IPostData {
    title: string
    summary: string
    content: string
    tags: string[]
    authorId: string
}

export async function fetchTags() {
    try {
        return await tagService.getAllTags();
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Failed to fetch tags.');
    }
}


export async function createBlogPost(data: IPostData) {
    try {
        const post = await blogPostService.add(data);
        return { success: true, post }
    } catch (error) {
        console.error('Failed to create blog post:', error)
        return { success: false, error: 'Failed to create blog post' }
    }
}