import type { AnyExtension, Content, Editor } from '@tiptap/core'
import { generateJSON, useEditor } from '@tiptap/react'
import ExtensionKit from '../extensions/extension-kit'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({ initialContent }: { initialContent?: string }) => {
  const value = initialContent ? generateJSON(initialContent, ExtensionKit().filter((e): e is AnyExtension => e !== undefined)) : undefined;
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ctx => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.focus('start', { scrollIntoView: true })
        }
      },
      content: value,
      extensions: ExtensionKit().filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          class: 'min-h-full',
        },
      },
    },
    [],
  )

  typeof window !== 'undefined' && (window.editor = editor)

  return { editor }
}
