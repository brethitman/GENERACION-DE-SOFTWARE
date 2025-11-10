import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useImperativeHandle, useEffect } from "react";

export interface EditableBlockHandle {
  insertResource: (resource: { type: "html" | "image"; content: string }) => void;
  editor: Editor | null;
}

interface Props {
  className?: string;
  onEditorReady?: (editor: Editor) => void;
  onFocus?: () => void;
  content?: string;
}

const EditableBlock = forwardRef<EditableBlockHandle, Props>(
  ({ className, onEditorReady, onFocus }, ref) => {
    const editor = useEditor({
      extensions: [StarterKit, TextStyle, Color],
      content: "",
      editorProps: {
        attributes: {
          class:
            "w-full h-full outline-none break-words p-2 text-sm [&_img]:w-full [&_img]:max-h-full [&_img]:object-contain",
        },
        handleDOMEvents: {
          focus: () => {
            onFocus?.();
            return false;
          },
        },
      },
    });

    // Avisar al padre cuando el editor esté listo
    useEffect(() => {
      if (editor) {
        onEditorReady?.(editor);
      }
    }, [editor]);

    useImperativeHandle(ref, () => ({
      insertResource(resource) {
        if (!editor) return;

        if (resource.type === "image") {
          editor.commands.insertContent(`<img src="${resource.content}" alt="imagen" />`);
        } else {
          editor.commands.insertContent(resource.content);
        }
      },
      editor,
    }));

    return (
      <div className={`relative border border-stone-200 rounded-sm bg-white ${className}`}>
        {!editor?.getText() && (
          <div className="absolute top-2 left-2 text-gray-400 pointer-events-none select-none text-sm">
            Escribir aquí
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    );
  }
);

export default EditableBlock;
