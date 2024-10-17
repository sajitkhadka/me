'use client'

import { useEffect, useState, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Editor from '@/components/editor/advanced-editor'
import { MultiSelect } from '@/components/custom-ui/multi-select'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { fetchTags, createBlogPost } from './actions'
import { defaultValue } from './default-value'
import './prosemirror.css'

import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { generateJSON } from '@tiptap/html'
import { Tags } from '@/db/tags.service'

const formSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
    summary: z.string().min(1, 'Summary is required').max(300, 'Summary must be 300 characters or less'),
    content: z.string().min(1, 'Content is required'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
})

type FormData = z.infer<typeof formSchema>

export default function CreateBlogPost() {
    const [tags, setTags] = useState<Tags>([])
    const [isPending, startTransition] = useTransition()
    const [submitError, setSubmitError] = useState('')

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            summary: '',
            content: defaultValue,
            tags: [],
        },
    })

    useEffect(() => {
        startTransition(() => {
            fetchTags().then(setTags)
        })
    }, [])

    const onSubmit = async (data: FormData) => {
        setSubmitError('')
        startTransition(async () => {
            const result = await createBlogPost({
                ...data,
                authorId: '2f827e65-3bd7-4dc6-807d-e5f9fba0eed7', // Replace with actual user ID
            })
            if (result.success) {
                // Handle successful submission (e.g., show success message, redirect)
                console.log('Blog post created:', result.post)
            } else {
                result.error && setSubmitError(result.error)
            }
        })
    }

    return (
        <Card className="w-full max-w-4xl mx-auto my-5">
            <CardHeader>
                <CardTitle>Create Your Blog Post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title
                        </label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <Input {...field} id="title" placeholder="Enter blog post title" />}
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="summary" className="text-sm font-medium">
                            Summary
                        </label>
                        <Controller
                            name="summary"
                            control={control}
                            render={({ field }) => <Textarea {...field} id="summary" placeholder="Enter a brief summary" />}
                        />
                        {errors.summary && <p className="text-sm text-red-500">{errors.summary.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">
                            Content
                        </label>
                        <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                                <Editor
                                    initialValue={generateJSON(field.value, [Document, Paragraph, Text, CodeBlock])}
                                    onChange={(value) => setValue('content', value)}
                                />
                            )}
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium">
                            Tags
                        </label>
                        {isPending ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            <Controller
                                name="tags"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect
                                        {...field}
                                        placeholder="Select Tags"
                                        data={tags.map((tag) => ({ label: tag.name, value: tag.name }))}
                                    // onChange={(value) => setValue('tags', value.map((tag) => tag.value))}
                                    />
                                )}
                            />
                        )}
                        {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
                    </div>

                    {submitError && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{submitError}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Creating...' : 'Create Blog Post'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}