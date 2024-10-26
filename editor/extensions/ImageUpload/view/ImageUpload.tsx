import { Editor, NodeViewWrapper } from '@tiptap/react'
import { useCallback } from 'react'

import { ImageUploader } from '../../../../components/custom-ui/ImageUploader'

export const ImageUpload = ({ getPos, editor }: { getPos: () => number; editor: Editor }) => {
  const onUpload = useCallback(
    (url: string, imageId: string) => {
      if (url) {
        editor.commands.addImageToTracker({ imageId, url })
        editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run()
      }
    },
    [getPos, editor],
  )

  return (
    <NodeViewWrapper>
      <div className="p-0 m-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  )
}

export default ImageUpload
