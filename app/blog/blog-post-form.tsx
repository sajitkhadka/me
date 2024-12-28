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

import { getUserSession } from '@/app/auth/login/actions'
import ImageUploader from '@/components/custom-ui/ImageUploader'
import { Tags } from '@/db/tags.service'
import { Editor } from '@/editor'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import blogPostService, { BlogPosts, BlogPostWithTagComments } from '@/db/blogpost.service'
import { createBlogPost, fetchTags, IPostData, updateBlogPost } from './create/actions'
import { PostTypeDropdown } from './create/post-type-dropdown'
import { ImageApi } from '@/lib/api/ImageApi'
import { AnyExtension, generateJSON } from '@tiptap/core'
import ExtensionKit from '@/editor/extensions/extension-kit'

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

interface BlogPostFormProps {
    post?: BlogPostWithTagComments | null
}

export default function BlogPostForm({ post }: BlogPostFormProps) {
    const [tags, setTags] = useState<Tags>([])
    const [isPending, startTransition] = useTransition()
    const [submitError, setSubmitError] = useState('')
    const [selectedItems, setSelectedItems] = useState<DataItem[]>(post?.tags.map(tag => ({ label: tag.tag.name, value: tag.tag.name })) || []);
    const [inputValue, setInputValue] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession();

    const successRef = React.useRef<HTMLDivElement>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, },
        setValue,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: post?.title || "",
            summary: post?.summary || '',
            content: post?.content || '',
            coverImage: post?.coverImage ? {
                url: ImageApi.getUrl(post.coverImage),
                imageId: post.coverImage,
            } : undefined,
            tags: post?.tags.map(tag => tag.tag.name) || [],
            uploadedImages: [],
            typeId: post?.typeId || 1,
        },
    })

    useEffect(() => {
        startTransition(() => {
            fetchTags().then(setTags)
        })
    }, [reset])

    const onSubmit = async (data: FormData) => {
        setSubmitError('')
        startTransition(async () => {
            setSubmitError('')
            setSuccess(false);
            const session = await getUserSession();
            if (!session?.user?.id) {
                setSubmitError('Please login to manage blog posts');
                return;
            }
            const newData: IPostData = {
                content: data.content,
                summary: data.summary,
                title: data.title,
                coverImage: data.coverImage,
                tags: data.tags,
                typeId: data.typeId,
                authorId: session?.user?.id,
            }
            // const action = postId ? updateBlogPost : createBlogPost;
            const result = post?.id ?
                await updateBlogPost(post, newData, data.uploadedImages) :
                await createBlogPost(newData, data.uploadedImages);
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
                <CardTitle>{post?.id ? 'Edit' : 'Create'} Your Blog Post</CardTitle>
            </CardHeader>
            <CardContent ref={successRef}>
                {success && (
                    <div className="bg-green-100 p-4 rounded-md border border-green-200 mb-4" >
                        <p className="text-green-700">Blog post {post?.id ? 'updated' : 'created'} successfully!</p>
                    </div>
                )}
                <form className="space-y-6">
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
                                    initialValue={field.value}
                                    // initialValue={field.value}
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
                                        value={value}
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

                    <Button type="button" disabled={isPending}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isPending ? (post?.id ? 'Updating...' : 'Creating...') : (post?.id ? 'Update' : 'Create') + ' Blog Post'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

