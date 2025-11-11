import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Bloque {
  tiptap: JSONContent;
}

interface Props {
  bloque: Bloque;
}


export default function BloqueSoloLectura({ bloque }: Props) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Image, TextStyle, Color],
    content: bloque.tiptap,
  });

  return (
    <div className="w-full max-h-[65vh] overflow-auto rounded bg-white [&_p]:text-sm">
      <EditorContent
        editor={editor}
        className="[&_p]:text-sm [&_img]:w-full [&_img]:h-auto [&_img]:max-h-[60vh] [&_img]:object-contain"
      />
    </div>
  );
}

