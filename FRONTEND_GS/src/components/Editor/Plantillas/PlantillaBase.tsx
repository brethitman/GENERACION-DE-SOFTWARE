// PlantillaBase.tsx
import { forwardRef, useImperativeHandle, useRef } from "react";

import type { EditorInstance } from "../../../types/editor";
import EditableBlock, { type EditableBlockHandle } from "../EditableBlock";

export interface PlantillaBaseHandle {
  insertResourceInBlock: (resource: { type: "html" | "image"; content: string }) => void;
}

interface Props {
  onEditorReady: (editor: EditorInstance, index: number) => void;
  setSelectedBlock: (index: number) => void;
}

const PlantillaBase = forwardRef<PlantillaBaseHandle, Props>(
  ({ onEditorReady, setSelectedBlock }, ref) => {
    const blockRef = useRef<EditableBlockHandle>(null);

    // Permitir que el padre inserte recursos
    useImperativeHandle(ref, () => ({
      insertResourceInBlock(resource) {
        blockRef.current?.insertResource(resource);
      },
    }));

    return (
      <div className="h-full w-full">
        <EditableBlock
          ref={blockRef}
          className="h-full"
          onEditorReady={(editor) => {
            onEditorReady(editor, 0); // siempre índice 0 para la plantilla base
            setSelectedBlock(0);
          }}
        />
      </div>
    );
  }
);

export default PlantillaBase;
