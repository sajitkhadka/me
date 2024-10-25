'use client'
import { useBlockEditor } from '@/editor/hooks/useBlockEditor'
import '@/editor/styles/index.css'
import { EditorContent } from '@tiptap/react'
import { useRef } from 'react'

import { useSidebar } from '@/editor/hooks/useSidebar'

import { initialContent } from '@/lib/data/initialContent'
import ImageBlockMenu from './extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from './extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from './extensions/Table/menus'
import { ContentItemMenu, LinkMenu, TextMenu } from './menus'


export const Editor = ({ onChange }: { onChange: (content: string) => void }) => {
  const menuContainerRef = useRef(null)

  const leftSidebar = useSidebar()
  const { editor } = useBlockEditor({ initialContent: initialContent })

  if (!editor) {
    return null
  }

  editor.on('update', ({ editor }) => {
    onChange(editor.getHTML())
    console.log(editor.storage.imageTracker.uploadedImages)
    // const state = editor.state
    // const removedImages: Array<{ imageId: string, url: string }> = [] // Array to track removed images

    // // Check for changes to the document
    // if (state.doc.content.size !== state.prevDoc?.content.size) {
    //   state.doc.descendants((node, pos) => {
    //     // Assuming you have an image node type called 'imageBlock'
    //     if (node.type.name === 'imageBlock' && !node.attrs.src) {
    //       const imageId = node.attrs.imageId // Assuming you have stored the imageId in node attributes
    //       removedImages.push(imageId)
    //     }
    //   })
    // }

    // // Remove the images from the tracker
    // removedImages.forEach(imageId => {
    //   editor.commands.removeImageFromTracker(imageId)
    // })
  })

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      {/* <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} /> */}
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        {/* <EditorHeader editor={editor} isSidebarOpen={leftSidebar.isOpen} toggleSidebar={leftSidebar.toggle} /> */}
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default Editor