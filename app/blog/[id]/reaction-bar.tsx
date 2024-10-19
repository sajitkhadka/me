'use client'

import { startTransition, useEffect, useState } from 'react'
import { Heart, MessageSquare, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SharePopup from './share-popup'
import { addReaction } from './actions'

interface ReactionBarProps {
    reactionsCount: number
    commentsCount: number
    postId: string
}


export default function ReactionBar({ reactionsCount: initialReactions, commentsCount, postId }: ReactionBarProps) {
    const [reactionsCount, setReactionsCount] = useState(initialReactions);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [hasReacted, setHasReacted] = useState(false);

    // Check if the user has already reacted when the component mounts
    useEffect(() => {
        const reacted = localStorage.getItem(`hasReactedToPost-${postId}`);
        if (reacted) {
            setHasReacted(true);
        }
    }, [postId]);

    const handleReaction = async () => {
        if (hasReacted) return; // Prevent further reactions if already reacted

        startTransition(async () => {
            const updatedPost = await addReaction(postId);
            setReactionsCount(updatedPost.reaction);
            setHasReacted(true);
            localStorage.setItem(`hasReactedToPost-${postId}`, 'true'); // Store reaction in localStorage
        });
    };

    return (
        <div className="flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center space-x-2" onClick={handleReaction} disabled={hasReacted}>
                <Heart className={hasReacted ? 'fill-red-500 text-red-500' : ''} />
                <span>{reactionsCount}</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
                <MessageSquare />
                <span>{commentsCount}</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2" onClick={() => setShowSharePopup(true)}>
                <Share />
                <span>Share</span>
            </Button>
            {showSharePopup && <SharePopup onClose={() => setShowSharePopup(false)} />}
        </div>
    );
}
