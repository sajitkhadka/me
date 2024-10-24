'use client'

import { DataItem, MultiSelect } from '@/components/custom-ui/multi-select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { createBlogPost, fetchTags } from './actions'
import './prosemirror.css'

import { getUserSession } from '@/app/auth/login/actions'
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
    const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
    const [inputValue, setInputValue] = useState("");
    const { data: session, status } = useSession();
    const [success, setSuccess] = useState(false);
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
            content: '',
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
            setSubmitError('')
            setSuccess(false);
            const session = await getUserSession();
            if (!session?.user?.id) {
                setSubmitError('Please login to create a blog post');
                return;
            }
            const result = await createBlogPost({
                ...data,
                authorId: session?.user?.id
            })
            if (result.success) {
                setSuccess(true);
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
                {success && (
                    <div className="bg-green-100 p-4 rounded-md border border-green-200 mb-4">
                        <p className="text-green-700">Blog post created successfully!</p>
                    </div>
                )}
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
                                // <Editor
                                //     initialValue={generateJSON(field.value, [Document, Paragraph, Text, CodeBlock])}
                                //     onChange={(value) => setValue('content', value)}
                                // />
                                <div>editor</div>
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
                                        inputValue={inputValue}
                                        onInputValueChange={setInputValue}
                                        selected={selectedItems}
                                        onSelectedChange={setSelectedItems}
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