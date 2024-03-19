import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "Digite algum texto",
        emptyEditorClass: "",
      }),
    ],
    content: "<h1>Back-end</h1> <p> Esse é um documento </p>",
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-invert prose-headings:mt-0",
      },
    },
  });
  return <EditorContent className="w-[65ch]" editor={editor} />;
}
