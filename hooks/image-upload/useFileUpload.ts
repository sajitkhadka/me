import { useCallback, useRef } from "react"

export const useFileUpload = () => {
    const fileInput = useRef<HTMLInputElement>(null)

    const handleUploadClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fileInput.current?.click()
    }, [])

    return { ref: fileInput, handleUploadClick }
}