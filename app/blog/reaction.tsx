'use client'

import { formatDate } from '@/lib/utils'
import { Calendar, MessageCircle, ThumbsUp } from 'lucide-react'

interface ReactionBarProps {
    reactionsCount: number
    commentsCount: number
    postId: number
    createdDate: Date
}

export default function Reaction({ reactionsCount, commentsCount, createdDate }: ReactionBarProps) {
    return (
        <div className="flex  sm:flex-row items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
            <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={createdDate.toDateString()}>{formatDate(createdDate.toDateString())}</time>
            </div>
            <div className='flex gap-4'>
                <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {commentsCount} comments
                </div>
                <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {reactionsCount} reactions
                </div>
            </div>
        </div>
    );
}
