// EditorCanvas.tsx
import { forwardRef } from "react";

import type { EditorInstance } from "../../types/editor";

import Plantilla1 from "./Plantillas/Plantilla1";
import type { Plantilla1Handle } from "./Plantillas/Plantilla1";
import PlantillaBase from "./Plantillas/PlantillaBase";
import type { PlantillaBaseHandle } from "./Plantillas/PlantillaBase";


interface Props {
  selectedLayout: number | null;
  onEditorReady: (editor: EditorInstance, index: number) => void;
  setSelectedBlock: (index: number) => void;
}

const EditorCanvas = forwardRef<
  PlantillaBaseHandle | Plantilla1Handle,
  Props
>(({ selectedLayout, onEditorReady, setSelectedBlock }, ref) => {
  const renderLayout = () => {
    switch (selectedLayout) {
      case 1:
        return (
          <Plantilla1
            ref={ref as React.Ref<Plantilla1Handle>}
            onEditorReady={onEditorReady}
            setSelectedBlock={setSelectedBlock}
          />
        );
      default:
        // Si no hay plantilla seleccionada, mostramos PlantillaBase
        return (
          <PlantillaBase
            ref={ref as React.Ref<PlantillaBaseHandle>}
            onEditorReady={onEditorReady}
            setSelectedBlock={setSelectedBlock}
          />
        );
    }
  };

  return (
    <div className="p-2 bg-gray-100 flex-1 overflow-auto h-[calc(100vh-120px)]">
      {renderLayout()}
    </div>
  );
});

export default EditorCanvas;
