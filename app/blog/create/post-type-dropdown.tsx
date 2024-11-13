'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPostTypes } from './actions'

interface PostType {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

interface PostTypeDropdownProps {
  onSelect: (postTypeId: number) => void
}

export function PostTypeDropdown({ onSelect }: PostTypeDropdownProps = { onSelect: () => { } }) {
  const [postTypes, setPostTypes] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPostTypes = async () => {
      try {
        setLoading(true)
        const postTypes = await getPostTypes();
        if (postTypes.error) {
          setError(postTypes.error);
        }
        else {
          setPostTypes(postTypes.data)
        }
      } catch (err) {
        setError('Failed to fetch post types')
      } finally {
        setLoading(false)
      }
    }

    fetchPostTypes()
  }, [])

  if (loading) return <div className="text-center">Loading post types...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div>
      <Select onValueChange={(value) => onSelect(Number(value))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a post type" />
        </SelectTrigger>
        <SelectContent>
          {postTypes.map((postType) => (
            <SelectItem key={postType.id} value={postType.id.toString()}>
              {postType.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}