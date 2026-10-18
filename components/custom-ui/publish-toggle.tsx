"use client"

import { setPostPublished } from "@/app/blog/create/actions"
import { useState, useTransition } from "react"

export const PublishToggle = ({ postId, published }: { postId: number, published: boolean }) => {
    const [pending, startTransition] = useTransition()
    const [error, setError] = useState<string>()

    const toggle = () => {
        if (published && !window.confirm("Unpublish this post? It will disappear from the public blog.")) return
        setError(undefined)
        startTransition(async () => {
            // The action revalidates the post and blog paths, so the page re-renders with the new state.
            const result = await setPostPublished(postId, !published)
            if (!result.success) setError(result.error)
        })
    }

    return (
        <span className="inline-flex items-center gap-2">
            <button
                type="button"
                onClick={toggle}
                disabled={pending}
                className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
                {pending ? "saving…" : published ? "unpublish" : "publish"}
            </button>
            {error && <span role="alert" className="text-destructive">{error}</span>}
        </span>
    )
}
