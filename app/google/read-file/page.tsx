'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReadFileForm() {
    const [fileId, setFileId] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleReadFile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Using the API route
            const response = await fetch(`/api/read-file?fileId=${fileId}`)
            if (!response.ok) {
                throw new Error('Failed to read file')
            }
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = fileId
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            setError('Error reading file')
        } finally {
            setLoading(false)
        }
    }


    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Read File from Google Drive</CardTitle>
                <CardDescription>Enter the file ID to read and download a file from Google Drive</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleReadFile}>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            value={fileId}
                            onChange={(e) => setFileId(e.target.value)}
                            placeholder="Enter File ID"
                            disabled={loading}
                        />
                        <Button type="submit" disabled={!fileId || loading}>
                            {loading ? 'Reading...' : 'Read File (API Route)'}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                {error && <p className="text-red-500">{error}</p>}
            </CardFooter>
        </Card>
    )
}