'use client'

import { Button } from '@/components/ui/button'
import { Heart, MessageSquare } from 'lucide-react'

interface ReactionBarProps {
    reactionsCount: number
    commentsCount: number
    postId: string
}


export default function Reaction({ reactionsCount, commentsCount }: ReactionBarProps) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
                <Heart className={reactionsCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                <span>{reactionsCount}</span>
            </div>
            <div className="flex items-center space-x-2">
                <MessageSquare />
                <span>{commentsCount}</span>
            </div>
        </div>
    );
}
