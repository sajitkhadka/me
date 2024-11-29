'use client'

import { DataItem, MultiSelect } from '@/components/custom-ui/multi-select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { createBlogPost, fetchTags } from './actions'

import { getUserSession } from '@/app/auth/login/actions'
import ImageUploader from '@/components/custom-ui/ImageUploader'
import { Tags } from '@/db/tags.service'
import { Editor } from '@/editor'
import { X } from 'lucide-react'
import Image from 'next/image'
import { BlogPostType } from '@/db/types'
import { useSession } from 'next-auth/react'
import postTypeService, { PostTypeService } from '@/db/posttype.service'
import { PostTypeDropdown } from './post-type-dropdown'
import React from 'react'

const imageSchema = z.object({
    url: z.string().trim().min(1),
    imageId: z.string().trim().min(1),
})
const formSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
    summary: z.string().min(1, 'Summary is required').max(300, 'Summary must be 300 characters or less'),
    content: z.string().min(1, 'Content is required'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
    coverImage: imageSchema.optional(),
    uploadedImages: z.array(imageSchema),
    typeId: z.number(),
})

type FormData = z.infer<typeof formSchema>

export default function CreateBlogPost() {
    const [tags, setTags] = useState<Tags>([])
    const [isPending, startTransition] = useTransition()
    const [submitError, setSubmitError] = useState('')
    const [selectedItems, setSelectedItems] = useState<DataItem[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();

    const successRef = React.useRef<HTMLDivElement>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, },
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            summary: '',
            content: '',
            coverImage: undefined,
            tags: [],
            uploadedImages: [],
            typeId: 1,
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
                content: data.content,
                summary: data.summary,
                title: data.title,
                coverImage: data.coverImage,
                tags: data.tags,
                authorId: session?.user?.id,
                typeId: data.typeId,
            }, data.uploadedImages)
            if (result.success) {
                setSuccess(true);
                successRef.current?.scrollIntoView({ behavior: 'smooth' });
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
            <CardContent ref={successRef}>
                {success && (
                    <div className="bg-green-100 p-4 rounded-md border border-green-200 mb-4" >
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
                        <label htmlFor="coverImage" className="text-sm font-medium">
                            Cover Image
                        </label>
                        <Controller
                            name="coverImage"
                            control={control}
                            render={({ field }) => (
                                field.value?.url ? (
                                    <div className="relative">
                                        <Image
                                            src={field.value.url}
                                            alt="Uploaded cover"
                                            width={400}
                                            height={300}
                                            className="w-full h-auto rounded-lg"
                                        />
                                        <button
                                            onClick={() => {
                                                setValue('coverImage', undefined)
                                            }}
                                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                                            aria-label="Remove image"
                                        >
                                            <X className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                ) : (
                                    <ImageUploader onUpload={(url, imageId) => {
                                        setValue('coverImage', { url, imageId })
                                    }}
                                    />
                                )
                            )}
                        />
                        {errors.coverImage && <p className="text-sm text-red-500">{errors.coverImage.message}</p>}
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
                                    // initialValue={generateJSON(field.value, [Document, Paragraph, Text, CodeBlock])}
                                    onChange={(value, uploadedImages) => {
                                        setValue('content', value)
                                        setValue('uploadedImages', uploadedImages)
                                    }}
                                />
                            )}
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
                        {errors.uploadedImages && <p className="text-sm text-red-500 mt-4">{errors.uploadedImages.message}</p>}
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

                    {session?.user?.role === 'admin' && (
                        <div className="space-y-2">
                            <label htmlFor="type" className="text-sm font-medium">
                                Blog Type
                            </label>
                            <Controller
                                name="typeId"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <PostTypeDropdown
                                        onSelect={onChange}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {submitError && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{submitError}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" disabled={isPending}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    >
                        {isPending ? 'Creating...' : 'Create Blog Post'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}