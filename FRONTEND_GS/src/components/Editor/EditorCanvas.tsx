import type { Editor } from '@tiptap/react';
import { forwardRef } from "react";

import type { Topico } from "../../types/Topico";

import Plantilla1 from "./Plantillas/Plantilla1";
import type { Plantilla1Handle } from "./Plantillas/Plantilla1";
import PlantillaBase from "./Plantillas/PlantillaBase";
import type { PlantillaBaseHandle } from "./Plantillas/PlantillaBase";

interface Props {
  selectedLayout: number | null;
  onEditorReady: (editor: Editor, index: number) => void;  // ✅ usar Editor
  setSelectedBlock: (index: number) => void;
  topico?: Topico;
}

const EditorCanvas = forwardRef<PlantillaBaseHandle | Plantilla1Handle, Props>(
  ({ selectedLayout, onEditorReady, setSelectedBlock, topico }, ref) => {
    const bloques = topico?.contenido?.bloques ?? [];

    const renderLayout = () => {
      switch (selectedLayout) {
        case 0:
          return (
            <PlantillaBase
              ref={ref as React.Ref<PlantillaBaseHandle>}
              onEditorReady={onEditorReady}
              setSelectedBlock={setSelectedBlock}
            />
          );
        case 1:
          return (
            <Plantilla1
              ref={ref as React.Ref<Plantilla1Handle>}
              onEditorReady={onEditorReady}
              setSelectedBlock={setSelectedBlock}
            />
          );
        default:
          return (
            <PlantillaBase
              ref={ref as React.Ref<PlantillaBaseHandle>}
              onEditorReady={onEditorReady}
              setSelectedBlock={setSelectedBlock}
              bloques={bloques}
            />
          );
      }
    };

    return (
      <div className="p-2 bg-gray-100 flex-1 overflow-auto h-[calc(100vh-120px)]">
        {renderLayout()}
      </div>
    );
  }
);

export default EditorCanvas;
