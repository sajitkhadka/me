'use client'

import { ImageApi } from '@/lib/api/ImageApi'
import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  Details,
  DetailsContent,
  DetailsSummary,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  TaskItem,
  TaskList,
  UniqueID,
} from '.'

import { ImageUpload } from './ImageUpload'
import { TableOfContentsNode } from './TableOfContentsNode'
import { isChangeOrigin } from '@tiptap/extension-collaboration'
import ImageTracker from './ImageTracker/ImageTracker'
import History from '@tiptap/extension-history'

export const ExtensionKit = () => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  // UniqueID.configure({
  //   types: ['paragraph', 'heading', 'blockquote', 'codeBlock', 'table'],
  //   filterTransaction: transaction => !isChangeOrigin(transaction),
  // }),
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: 'details',
    },
  }),
  DetailsContent,
  DetailsSummary,
  CodeBlock,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  // TableOfContents,
  // TableOfContentsNode,
  ImageUpload.configure({
    // clientId: 'image-upload',
    // onUpload: (url: string) => {
    //   const image = document.createElement('img')
    //   image.src = url
    //   document.body.append(image)
    // },
  }),
  ImageBlock,
  ImageTracker,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async file => {
        const { url, imageId } = await ImageApi.upload(file)
        currentEditor.commands.addImageToTracker({ imageId, url })
        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
      })
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async file => {
        const { url } = await ImageApi.upload(file)
        return currentEditor
          .chain()
          .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
          .focus()
          .run()
      })
    },
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
  History.configure({
    depth: 25,
  })

]

export default ExtensionKit
