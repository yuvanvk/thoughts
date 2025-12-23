"use client";
import {
  EditorContent,
  useCurrentEditor,
  useEditorState,
} from "@tiptap/react";
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
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  // @ts-ignore
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

  return (
    <>
      <EditorContent editor={editor} />
      <BubbleMenu
        editor={editor}
        options={{ placement: "bottom", offset: 8, flip: true }}
        className="border py-2 px-3 bg-[#0D0D10] rounded-2xl"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            `${isBold ? "is-active" : ""}`,
            "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
          )}
          type="button"
        >
          <BoldIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            `${isItalic ? "is-active" : ""}`,
            "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
          )}
          type="button"
        >
          <ItalicIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            `${isUnderline ? "is-active" : ""}`,
            "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
          )}
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            `${isStrikethrough ? "is-active" : ""}`,
            "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
          )}
          type="button"
        >
          <LucideStrikethrough size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            `${isHighlight ? "is-active" : ""}`,
            "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
          )}
        >
          <Highlighter size={18} />
        </button>
      </BubbleMenu>

      <FloatingMenu
        editor={editor}
        options={{ placement: "right-start", strategy: "absolute" }}
        className=""
      >
        <div
          className="border py-2 px-2 bg-[#0D0D10] rounded-2xl flex items-center"
          data-testid="floating-menu"
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cn(
              `${editor.isActive("heading", { level: 1 }) ? "is-active" : ""}`,
              "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
            )}
          >
            <Heading1Icon size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cn(
              `${editor.isActive("heading", { level: 2 }) ? "is-active" : ""}`,
              "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
            )}
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              `${editor.isActive("bulletList") ? "is-active" : ""}`,
              "px-2 py-2 text-sm cursor-pointer hover:bg-neutral-800 rounded-[8px]"
            )}
          >
            <List size={18} />
          </button>
        </div>
      </FloatingMenu>
    </>
  );
};
