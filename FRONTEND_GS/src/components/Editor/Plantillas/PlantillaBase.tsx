// PlantillaBase.tsx
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";

import type { Bloque } from "../../../types/Topico";
import type { EditorInstance } from "../../../types/editor";
import EditableBlock, { type EditableBlockHandle } from "../EditableBlock";

export interface PlantillaBaseHandle {
  insertResourceInBlock: (resource: { type: "html" | "image"; content: string }) => void;
}

interface Props {
  onEditorReady: (editor: EditorInstance, index: number) => void;
  setSelectedBlock: (index: number) => void;

  /** 🔹 Contenido inicial del tópico */
  bloques?: Bloque[];
}

const PlantillaBase = forwardRef<PlantillaBaseHandle, Props>(
  ({ onEditorReady, setSelectedBlock, bloques }, ref) => {
    const blockRef = useRef<EditableBlockHandle>(null);

    useImperativeHandle(ref, () => ({
      insertResourceInBlock(resource) {
        blockRef.current?.insertResource(resource);
      },
    }));

    // Si tienes contenido JSON, se inyecta al montar
    useEffect(() => {
      if (bloques && bloques[0]?.html && blockRef.current?.editor) {
        blockRef.current.editor.commands.setContent(bloques[0].html);
      }
    }, [bloques]);

    return (
      <div className="h-full w-full">
        <EditableBlock
          ref={blockRef}
          className="h-full"
          onEditorReady={(editor) => {
            onEditorReady(editor, 0);
            setSelectedBlock(0);
          }}
        />
      </div>
    );
  }
);


export default PlantillaBase;
