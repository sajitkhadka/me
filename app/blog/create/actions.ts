'use server'

import { auth } from '@/auth';
import blogPostService, { BlogPostWithTagComments } from '@/db/blogpost.service';
import imageService from '@/db/image.service';
import postTypeService from '@/db/posttype.service';
import tagService from '@/db/tags.service';
import { ImageType } from '@/editor/extensions/ImageTracker';
import { ImageApi } from '@/lib/api/ImageApi';
import prisma from '@/lib/prisma';
import { BlogType } from '@prisma/client';

export interface IPostData {
    title: string
    summary: string
    content: string
    tags: string[]
    authorId: string
    coverImage?: ImageType,
    typeId: number
}

export interface IUpdateData extends Partial<IPostData> {
    published?: boolean,
    version?: number
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
            const pendingImages = uploadedImages.map((image) => image.imageId)
            if (!data.coverImage?.imageId && uploadedImages.length > 0) {
                data.coverImage = uploadedImages[0];
            } else if (data.coverImage?.imageId) {
                pendingImages.push(data.coverImage.imageId)
            }
            const createPost = await blogPostService.add(data);
            const pendingImagesDetails = await imageService.getPendingImages(pendingImages);
            await imageService.savePendingImages(createPost.id, pendingImagesDetails.map((image) => image.image));
            await imageService.clearPendingImage(pendingImages);
            return createPost;
        });
        return { success: true, post }
    } catch (error) {
        console.error('Failed to create blog post:', error)
        return { success: false, error: 'Failed to create blog post' }
    }
}

export async function updateBlogPost(post: BlogPostWithTagComments, data: IPostData, uploadedImages: ImageType[]) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('Please login to update a blog post');
        }
        const newPost = await prisma.$transaction(async () => {
            const pendingImages = uploadedImages.map((image) => image.imageId)
            if (!data.coverImage?.imageId && (uploadedImages.length > 0 || post.images.length > 0)) {
                data.coverImage = post.images?.[0] ? { imageId: post.images[0].image, url: ImageApi.getUrl(post.images[0].image) } : uploadedImages[0];
            } else if (data.coverImage?.imageId && (data.coverImage.imageId !== post.coverImage)) {
                pendingImages.push(data.coverImage.imageId)
            }
            const newTags = data.tags.filter((tag) => !post.tags.some((t) => t.tag.name === tag));
            const updatedPost = await blogPostService.update(post.id, { ...data, tags: newTags });
            const pendingImagesDetails = await imageService.getPendingImages(pendingImages);
            await imageService.savePendingImages(post.id, pendingImagesDetails.map((image) => image.image));
            await imageService.clearPendingImage(pendingImages);
            return updatedPost;
        });
        return { success: true, post: newPost }
    } catch (error: any) {
        console.error('Failed to update blog post:', error)
        return { success: false, error: 'Failed to update blog post' + error.message }
    }
}

export async function getPostTypes() {
    try {
        const postTypes = await postTypeService.getAllPostTypes();
        return { data: postTypes, success: true };
    } catch (error) {
        console.error('Error fetching post types:', error);
        return { data: [] as BlogType[], success: false, error: 'Failed to fetch post types' };
    }
}