import type { Editor } from '@tiptap/react';
import { forwardRef, useImperativeHandle, useRef } from "react";

import EditableBlock, { type EditableBlockHandle } from "../EditableBlock";

export interface Plantilla1Handle {
  insertResourceInBlock: (
    blockIndex: number,
    resource: { type: "html" | "image"; content: string }
  ) => void;
}

interface Props {
  onEditorReady: (editor: Editor, index: number) => void;
  setSelectedBlock: (index: number) => void;
}

const Plantilla1 = forwardRef<Plantilla1Handle, Props>(
  ({ onEditorReady, setSelectedBlock }, ref) => {
    const blockRefs = [
      useRef<EditableBlockHandle>(null),
      useRef<EditableBlockHandle>(null),
    ];

    // Exponer función para insertar recursos
    useImperativeHandle(ref, () => ({
      insertResourceInBlock(blockIndex, resource) {
        const block = blockRefs[blockIndex];
        block?.current?.insertResource(resource);
      },
    }));

    return (
      <div className="grid grid-cols-[1fr_1fr] gap-2 h-full">
        {blockRefs.map((blockRef, index) => (
          <EditableBlock
            key={index}
            ref={blockRef}
            className="h-full"
            onEditorReady={(editor) => onEditorReady(editor, index)}
            onFocus={() => setSelectedBlock(index)}
          />
        ))}
      </div>
    );
  }
);

export default Plantilla1;
