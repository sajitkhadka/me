import { ImageApi } from "@/lib/api/ImageApi"
import { useState, useCallback } from "react"
import toast from "react-hot-toast"

export const useUploader = ({ onUpload }: { onUpload: (url: string, imageId: string) => void }) => {
    const [loading, setLoading] = useState(false)

    const uploadFile = useCallback(
        async (file: File) => {
            setLoading(true)
            try {
                const { url, imageId } = await ImageApi.upload(file)

                onUpload(url, imageId)
            } catch (errPayload: any) {
                const error = errPayload?.response?.data?.error || 'Something went wrong'
                toast.error(error)
            }
            setLoading(false)
        },
        [onUpload],
    )

    return { loading, uploadFile }
}