'use client'

import { IComment } from '@/db/comments.service'
import { useState } from 'react'
import CommentForm from './comment-form'
import CommentList from './comment-list'
import ReactionBar from './reaction-bar'

interface CommentsProps {
    postId: number
    initialComments: IComment[]
    totalComments: number
    totalReactions: number
}

export default function Comments({ postId, initialComments, totalComments, totalReactions }: CommentsProps) {
    const [comments, setComments] = useState(initialComments)
    const [commentCount, setCommentCount] = useState(totalComments)

    const handleAddComment = (newComment: IComment) => {
        setComments((prevComments) => [newComment, ...prevComments])
        setCommentCount((prevCount) => prevCount + 1)
    }

    return (
        <div className="space-y-4">
            <ReactionBar
                reactionsCount={totalReactions}
                commentsCount={commentCount}
                postId={postId}
            />
            <h2 className="text-2xl font-bold">Comments ({commentCount})</h2>
            <CommentForm postId={postId} onCommentAdded={handleAddComment} />
            <CommentList
                postId={postId}
                totalComments={commentCount}
                initialComments={comments}
            />
        </div>
    )
}