'use server'

import { auth } from '@/auth';
import blogPostService from '@/db/blogpost.service';
import imageService from '@/db/image.service';
import tagService from '@/db/tags.service';
import { ImageType } from '@/editor/extensions/ImageTracker';
import prisma from '@/lib/prisma';

export interface IPostData {
    title: string
    summary: string
    content: string
    tags: string[]
    authorId: string
    coverImage?: ImageType,
}

export async function fetchTags() {
    try {
        return await tagService.getAllTags();
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Failed to fetch tags.');
    }
}


export async function createBlogPost(data: IPostData, uploadedImages: ImageType[]) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('Please login to create a blog post');
        }
        //for all uploaded images delete the record from pendingImages and add it to images
        const post = await prisma.$transaction(async () => {
            const createPost = await blogPostService.add(data);
            const pendingImages = uploadedImages.map((image) => image.imageId)
            await imageService.savePendingImages(createPost.id, pendingImages);
            if (data.coverImage?.imageId) pendingImages.push(data.coverImage.imageId)
            await imageService.clearPendingImage(pendingImages);
            return createPost;
        });
        return { success: true, post }
    } catch (error) {
        console.error('Failed to create blog post:', error)
        return { success: false, error: 'Failed to create blog post' }
    }
}