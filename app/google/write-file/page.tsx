'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { uploadFile } from './actions'

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (formData: FormData) => {
        setUploading(true)
        setUploadStatus(null)

        try {
            const result = await uploadFile(formData)
            setUploadStatus(`File uploaded successfully. File ID: ${result.fileId}`)
        } catch (error) {
            console.error('Error:', error)
            setUploadStatus('Error uploading file')
        } finally {
            setUploading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Upload Image to Google Drive</CardTitle>
                <CardDescription>Select an image file to upload to your Google Drive</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        <Button type="submit" disabled={!file || uploading}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                {uploadStatus && (
                    <p className={uploadStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}>
                        {uploadStatus}
                    </p>
                )}
            </CardFooter>
        </Card>
    )
}