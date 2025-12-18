"use client";

import Bold from "@tiptap/extension-bold";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import {
  useEditor,
  EditorContent,
  EditorContext,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import { cn } from "@workspace/ui/lib/utils";
import {
  BoldIcon,
  Heading1Icon,
  Heading2,
  Highlighter,
  ItalicIcon,
  List,
  LucideStrikethrough,
  UnderlineIcon,
} from "lucide-react";

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Underline,
      Italic,
      HorizontalRule,
      Highlight,
      Heading,
    ],
    content: "<p>Share your thoughts</p>",
    immediatelyRender: false,
    autofocus: true,
  });

  //@ts-ignore
  const { isBold, isItalic, isStrikethrough, isHighlight, isUnderline } =
    useEditorState({
      editor,
      selector: (ctx) => ({
        isBold: ctx?.editor?.isActive("bold"),
        isItalic: ctx?.editor?.isActive("italic"),
        isStrikethrough: ctx?.editor?.isActive("strike"),
        isHighlight: ctx.editor?.isActive("highlight"),
        isUnderline: ctx.editor?.isActive("underline"),
      }),
    });

  if (!editor) {
    return null;
  }

  return (
    <EditorContext value={{ editor }}>
      <EditorContent editor={editor} />
      <BubbleMenu
        editor={editor}
        options={{ placement: "bottom", offset: 8, flip: true }}
        className="border pt-2 px-2 bg-neutral-800"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            `${isBold ? "is-active" : ""}`,
            "px-1 text-sm cursor-pointer"
          )}
          type="button"
        >
          <BoldIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            `${isItalic ? "is-active" : ""}`,
            "px-1 text-xs cursor-pointer"
          )}
          type="button"
        >
          <ItalicIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            `${isUnderline ? "is-active" : ""}`,
            "px-1 text-sm cursor-pointer"
          )}
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            `${isStrikethrough ? "is-active" : ""}`,
            "px-1 text-sm cursor-pointer"
          )}
          type="button"
        >
          <LucideStrikethrough size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            `${isHighlight ? "is-active" : ""}`,
            "px-1 text-sm cursor-pointer"
          )}
        >
          <Highlighter size={18} />
        </button>
      </BubbleMenu>

      <FloatingMenu
        editor={editor}
        options={{ placement: "right-start", strategy: "absolute" }}
      >
        <div
          className="px-2 pt-2 space-x-2 bg-neutral-800"
          data-testid="floating-menu"
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <Heading1Icon size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <List size={18} />
          </button>
        </div>
      </FloatingMenu>
    </EditorContext>
  );
};
