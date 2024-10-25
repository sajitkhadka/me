import { Extension, Command, RawCommands } from '@tiptap/core'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageTracker: {
            addImageToTracker: (image: { imageId: string; url: string }) => ReturnType
            removeImageFromTracker: (imageId: string) => ReturnType
        }
    }
}

export const ImageTracker = Extension.create({
    name: 'imageTracker',

    addStorage() {
        return {
            uploadedImages: [] as Array<{ imageId: string, url: string }>,
        }
    },

    addCommands() {
        return {
            addImageToTracker:
                (image: { imageId: string; url: string }): Command =>
                    ({ editor }) => {
                        console.log("adding", image)
                        editor.storage.imageTracker.uploadedImages.push(image)
                        return true
                    },
            removeImageFromTracker:
                (imageId: string): Command =>
                    ({ editor }) => {
                        const index = editor.storage.imageTracker.uploadedImages.findIndex((img: any) => img.imageId === imageId)
                        if (index !== -1) {
                            editor.storage.imageTracker.uploadedImages.splice(index, 1)
                        }
                        return true
                    },
        }
    }
})

export default ImageTracker
