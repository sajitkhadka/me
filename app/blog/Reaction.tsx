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
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <time dateTime={createdDate.toDateString()}>{formatDate(createdDate.toDateString())}</time>
            </div>
            <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                {commentsCount} comments
            </div>
            <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {reactionsCount} reactions
            </div>
        </div>
    );
}
