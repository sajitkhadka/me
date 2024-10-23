'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { IComment } from '@/db/comments.service'
import { useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createComment } from './actions'

interface CommentFormProps {
    postId: number
    parentId?: string
    onCommentAdded?: (comment: IComment) => void
}

export default function CommentForm({ postId, parentId, onCommentAdded }: CommentFormProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)
    const { pending } = useFormStatus()

    return (
        <div className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form
                ref={formRef}
                action={async (formData) => {
                    try {
                        const comment = await createComment(formData)
                        formRef.current?.reset()
                        onCommentAdded?.(comment)
                        setError(null)
                    } catch (e) {
                        if (e instanceof Error) {
                            setError(e.message)
                        } else {
                            setError('An unexpected error occurred')
                        }
                    }
                }}
                className="space-y-4"
            >
                <input type="hidden" name="postId" value={postId} />
                {parentId && <input type="hidden" name="parentId" value={parentId} />}
                <Textarea
                    name="content"
                    className="w-full"
                    rows={4}
                    placeholder="Write your comment here..."
                    required
                    aria-label="Comment"
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={pending}>
                        {pending ? 'Submitting...' : parentId ? 'Reply' : 'Comment'}
                    </Button>
                </div>
            </form>
        </div>
    );
}