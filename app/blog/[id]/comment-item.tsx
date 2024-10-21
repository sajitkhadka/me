'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IComment } from '@/db/comments.service'
import { formatDistanceToNow } from 'date-fns'
import { startTransition, useEffect, useState } from 'react'
import { addDownvote, addUpvote, getRepliesByCommentId } from './actions'
import CommentForm from './comment-form'

interface CommentItemProps {
    comment: IComment
    postId: string
    depth?: number,
    onAddReply?: (comment: IComment) => void
}

export default function CommentItem({ comment, postId, depth = 0, onAddReply }: CommentItemProps) {
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [childComments, setChildComments] = useState<IComment[]>([])
    const [isLoadingChildren, setIsLoadingChildren] = useState(false)
    const [hasMoreChildren, setHasMoreChildren] = useState(false)
    const [upvotes, setUpvotes] = useState(comment.upvotes || 0)
    const [downvotes, setDownvotes] = useState(comment.downvotes || 0)
    const [hasVoted, setHasVoted] = useState<'upvoted' | 'downvoted' | null>(null)

    useEffect(() => {
        const savedVote = localStorage.getItem(`comment-vote-${comment.id}`)
        if (savedVote) {
            setHasVoted(savedVote as 'upvoted' | 'downvoted')
        }
        setHasMoreChildren(comment._count.replies > childComments.length && !(comment._count.replies > 0 && childComments.length === 0))
    }, [childComments.length, comment._count.replies, showReplyForm, comment.id])

    const loadChildComments = async () => {
        if (isLoadingChildren) return;
        setIsLoadingChildren(true)
        startTransition(async () => {
            const replies = await getRepliesByCommentId(comment.id, 5, childComments.length);
            setChildComments((prev) => [...prev, ...replies]);
            setHasMoreChildren(comment._count.replies > childComments.length + replies.length)
            setIsLoadingChildren(false)
        })
    }

    const handleReplyAdded = (reply: IComment) => {
        onAddReply?.(reply);
        setChildComments([reply, ...childComments])
        setShowReplyForm(false)
    }

    const handleUpvote = () => {
        if (hasVoted) return;
        startTransition(async () => {
            setUpvotes(prev => prev + 1)
            setHasVoted('upvoted')
            localStorage.setItem(`comment-vote-${comment.id}`, 'upvoted')
            // Send an API request to update the upvote count in the backend
            await addUpvote(comment.id);
        })


    }

    const handleDownvote = () => {
        if (hasVoted) return;  // Prevent multiple votes
        startTransition(async () => {
            setDownvotes(prev => prev + 1)
            setHasVoted('downvoted')
            localStorage.setItem(`comment-vote-${comment.id}`, 'downvoted')
            // Send an API request to update the downvote count in the backend
            await addDownvote(comment.id);
        })

    }

    return (
        <div className={`space-y-2 ${depth > 0 ? 'ml-4 pl-4 border-l' : ''}`}>
            <div className="flex items-start space-x-4">
                <Avatar>
                    <AvatarFallback>{comment.user?.username?.[0] || comment.user?.name?.[0] || 'A'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <div className='flex gap-5'>
                        <span className="text-sm font-medium">{comment.user?.username || comment.user?.name || 'Anonymous'}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex space-x-2 items-center">
                        <Button variant="link" className='px-0' onClick={() => setShowReplyForm(!showReplyForm)}>
                            {showReplyForm ? "Cancel" : "Reply"}
                        </Button>

                        <div className="flex items-center space-x-1">
                            <Button
                                variant="link"
                                className={`px-2 ${hasVoted === 'upvoted' ? 'text-green-500' : 'text-gray-500'}`}
                                onClick={handleUpvote}
                                disabled={!!hasVoted}  // Disable the button if already voted
                            >
                                ▲
                            </Button>
                            <span className="text-sm">{upvotes}</span>
                            <Button
                                variant="link"
                                className={`px-2 ${hasVoted === 'downvoted' ? 'text-red-500' : 'text-gray-500'}`}
                                onClick={handleDownvote}
                                disabled={!!hasVoted}  // Disable the button if already voted
                            >
                                ▼
                            </Button>
                            <span className="text-sm">{downvotes}</span>
                        </div>
                        {comment._count.replies > 0 && childComments.length === 0 && (
                            <Button variant="link" onClick={loadChildComments}>
                                Show Replies ({comment._count.replies})
                            </Button>
                        )}
                    </div>
                    {showReplyForm && (
                        <CommentForm postId={postId} parentId={comment.id} onCommentAdded={handleReplyAdded} />
                    )}
                </div>
            </div>

            {childComments.map((childComment) => (
                <CommentItem key={childComment.id} comment={childComment} postId={postId} depth={depth + 1} />
            ))}
            {hasMoreChildren && (
                <Button variant="link" onClick={loadChildComments} disabled={isLoadingChildren}>
                    {isLoadingChildren ? 'Loading...' : 'Load more replies'}
                </Button>
            )}
        </div>
    )
}
