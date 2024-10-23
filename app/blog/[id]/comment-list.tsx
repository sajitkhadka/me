'use client'

import { startTransition, useEffect, useState } from 'react'
import CommentItem from './comment-item'
import { Button } from '@/components/ui/button'
import commentService, { IComment } from '@/db/comments.service'
import { getCommentsByBlogPostId } from './actions'

interface CommentListProps {
    initialComments: IComment[]
    postId: number
    totalComments: number
}

export default function CommentList({ initialComments, postId, totalComments }: CommentListProps) {
    const [comments, setComments] = useState(initialComments)
    const [page, setPage] = useState(1)
    const commentsPerPage = 5

    useEffect(() => {
        setComments(initialComments)
        setPage(1)
    }, [initialComments])

    const loadMoreComments = async () => {
        startTransition(async () => {
            const newComments = await getCommentsByBlogPostId(postId, {
                limit: commentsPerPage,
                offset: page * commentsPerPage
            })
            setComments([...comments, ...newComments])
            setPage(page + 1)
        })
    }

    const handleAddComment = (newComment: IComment) => {
        setComments([newComment, ...comments])
    }

    const handleAddReply = (newReply: IComment) => {
        setComments((prevComments) => {
            return prevComments.map((comment) => {
                if (comment.id === newReply.parentCommentId) {
                    return {
                        ...comment,
                        _count: {
                            ...comment._count,
                            replies: comment._count.replies + 1
                        },
                    }
                }
                return comment
            })
        })
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    onAddReply={handleAddReply}
                />
            ))}
            {comments.length < totalComments && (
                <Button onClick={loadMoreComments} className="w-full">
                    Load More Comments
                </Button>
            )}
        </div>
    )
}