import type { Editor } from '@tiptap/react';
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";

interface Props {
  editor: Editor;
}

export default function SubMenuTexto({ editor }: Props) {
  if (!editor) {
    return (
      <div className="p-2 text-sm text-gray-400 italic">
        Esperando el editor...
      </div>
    );
  }

  return (
    <div className="flex gap-2 p-2 bg-gray-50">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="border-1 border-stone-700 rounded-lg hover:bg-stone-100">
        <FaBold className="text-stone-700"/>
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="border-1 border-stone-700 rounded-lg hover:bg-stone-100">
        <FaItalic className="text-stone-700"/>
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="border-1 border-stone-700 rounded-lg hover:bg-stone-100">
        <FaUnderline className="text-stone-700"/>
      </button>
      <button
        onClick={() => {
          const color = prompt("Ingresa un codigo de color (ej: red, #f00):");
          if (color) editor.chain().focus().setColor(color).run();
        }}
        className="p-1 border rounded hover:bg-gray-100"
      >
        <MdColorLens className="text-stone-700"/>
      </button>
    </div>
  );
}
