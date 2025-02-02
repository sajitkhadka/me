import { Extension, Command, RawCommands } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state';
export type ImageType = { imageId: string; url: string }
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageTracker: {
            addImageToTracker: (image: ImageType) => ReturnType
            removeImageFromTracker: (imageId: string) => ReturnType
        }
    }
}

export const ImageTracker = Extension.create({
    name: 'imageTracker',

    addStorage() {
        return {
            uploadedImages: [] as Array<ImageType>,
        }
    },

    addCommands() {
        return {
            addImageToTracker:
                (image: ImageType): Command =>
                    ({ editor }) => {
                        editor.storage.imageTracker.uploadedImages.push(image)
                        return true
                    },
            removeImageFromTracker:
                (imgSrc: string): Command =>
                    ({ editor }) => {
                        const index = editor.storage.imageTracker.uploadedImages.findIndex((img: ImageType) => img.url === imgSrc)
                        if (index !== -1) {
                            editor.storage.imageTracker.uploadedImages.splice(index, 1)
                        }
                        return true
                    },
        }
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handleDOMEvents: {
                        keydown: (view, event) => {
                            if (event.key === 'Backspace' || event.key === 'Delete') {
                                const { from, to } = view.state.selection
                                const transaction = view.state.tr

                                //TODO: remove from tracker for all images from from to to inclusive
                                const node = view.state.doc.nodeAt(from)
                                if (node && node.type.name === 'imageBlock') {
                                    const src = node.attrs.src
                                    view.dispatch(transaction);
                                    view.dispatch(view.state.tr.delete(from, to));
                                    this.editor.commands.removeImageFromTracker(src);
                                    return true
                                }
                            }
                            return false
                        },
                    },
                },
            })
        ]
    },
})

export default ImageTracker
