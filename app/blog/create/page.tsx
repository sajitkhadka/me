"use client";
import Editor from "@/components/editor/advanced-editor";
// import { ThemeToggle } from "@/components/theme-toggle";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "./default-value";
import "./prosemirror.css";

import { generateJSON } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CodeBlock from "@tiptap/extension-code-block";

export default function Home() {
    const [value, setValue] = useState<string>(defaultValue);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between container">
            <div className="flex flex-col p-6 w-full gap-6 rounded-md bg-card">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Create Your blog Post</h1>
                </div>
                <Editor initialValue={generateJSON(value, [Document, Paragraph, Text, CodeBlock])} onChange={setValue} />
            </div>
        </main>
    );
}