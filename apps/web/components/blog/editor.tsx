"use client";

import Bold from "@tiptap/extension-bold";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight"
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading";

export const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit, Bold, Underline, Italic, HorizontalRule, Highlight, Heading],
        content: '<p>Share your thoughts</p>',
        immediatelyRender: false,
        autofocus: true
    })

    if(!editor) {
        return null
    }


    return <EditorContext value={{ editor }}>
        <EditorContent editor={editor} />
    </EditorContext>
}

