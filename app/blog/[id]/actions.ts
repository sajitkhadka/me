'use server'

import blogPostService from '@/db/blogpost.service';
import commentService from '@/db/comments.service'
import { Pagination } from '@/db/types';
import exp from 'constants';

export async function createComment(formData: FormData) {
    const content = formData.get('content') as string
    const postId = formData.get('postId') as string
    const userId = (formData.get('userId') as string) || undefined;
    const parentId = formData.get('parentId') as string

    if (!content.trim() || !postId) {
        throw new Error('Missing required fields')
    }
    try {
        return await commentService.createComment(content, postId, parentId, userId)
    } catch (error) {
        console.error('Error submitting comment:', error)
        throw new Error('Failed to submit comment. Please try again.')
    }
}

export async function getRepliesByCommentId(commentId: string, limit: number, offset: number) {
    return await commentService.getRepliesByCommentId(commentId, { limit, offset })
}

export async function addReaction(postId: string) {
    return await blogPostService.addReaction(postId)
}

export async function getCommentsByBlogPostId(postId: string, options: Pagination) {
    return await commentService.getCommentsByBlogPostId(postId, options)
}

export async function addUpvote(commentId: string) {
    return await commentService.addUpvote(commentId)
}

export async function addDownvote(commentId: string) {
    return await commentService.addDownvote(commentId)
}