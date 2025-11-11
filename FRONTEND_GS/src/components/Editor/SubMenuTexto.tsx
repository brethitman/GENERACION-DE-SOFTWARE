import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";

import type { EditorInstance } from "../../types/editor";

interface Props {
  editor: EditorInstance;
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
    <div className="flex gap-2 p-2 bg-gray-50 border-b">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-1 border rounded hover:bg-gray-100">
        <FaBold />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-1 border rounded hover:bg-gray-100">
        <FaItalic />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="p-1 border rounded hover:bg-gray-100">
        <FaUnderline />
      </button>
      <button
        onClick={() => {
          const color = prompt("Ingresa un color (ej: red, #f00):");
          if (color) editor.chain().focus().setColor(color).run();
        }}
        className="p-1 border rounded hover:bg-gray-100"
      >
        <MdColorLens />
      </button>
    </div>
  );
}
