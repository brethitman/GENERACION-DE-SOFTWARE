// EditorMenu.tsx
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState , useEffect} from "react";

import type { Topico } from "../../services/topicos";
import type { EditorInstance } from "../../types/editor";
 
import EditorCanvas from "./EditorCanvas";
import SubMenuPlantillas from "./SubMenuPlantillas";
import SubMenuRecursos from "./SubMenuRecursos";
import SubMenuTexto from "./SubMenuTexto";


type SubMenu = "plantillas" | "texto" | "recursos" | "ayuda";

interface EditorMenuProps {
  topico?: Topico; // <-- nuevo prop
}


export default function EditorMenu({ topico }: EditorMenuProps) {
  const [activeTab, setActiveTab] = useState<SubMenu>("plantillas");
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

  // Guardamos las instancias de los editores de cada bloque
  const [editorByBlock, setEditorByBlock] = useState<{ [key: number]: EditorInstance }>({});
  const [selectedBlock, setSelectedBlock] = useState<number>(0); // inicio con bloque 0 (PlantillaBase)

  // Callback que recibe cada EditableBlock al montarse
const handleEditorReady = (editor: EditorInstance, index: number) => {
  setEditorByBlock((prev) => ({ ...prev, [index]: editor }));
};

  // Callback para insertar recursos (imagen, HTML, etc.) en el bloque activo
  const handleAddResource = (resource: { type: "html" | "image"; content: string }) => {
    const editor = editorByBlock[selectedBlock];
    if (!editor) return;

    if (resource.type === "image") {
      editor.commands.insertContent(`<img src="${resource.content}" alt="imagen" />`);
    } else if (resource.type === "html") {
      editor.commands.insertContent(resource.content);
    }
  };

  const tabs = [
    { key: "plantillas", label: "Plantillas" },
    { key: "texto", label: "Texto" },
    { key: "recursos", label: "Recursos" },
    { key: "ayuda", label: "Ayuda" },
  ] as const;


  //- Si tiene contenido JSON, lo inyectamos en el EditorCanvas o en los bloques correspondientes.
useEffect(() => {
  if (!topico || !topico.contenido) return;

  // Obtenemos los bloques, si no existen usamos array vacío
  const bloques = topico.contenido.bloques ?? [];

  bloques.forEach((bloque, i) => {
    const editor = editorByBlock[i];
    if (editor && bloque.html) {
      editor.commands.setContent(bloque.html);
    }
  });
}, [topico, editorByBlock]);

  return (
    <div className="bg-white shadow-sm h-[calc(100vh-80px)] flex flex-col">
      {/* --- Barra superior de pestañas --- */}
      <div className="flex items-center justify-between border-b bg-gray-50">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-none text-xs transition ${
                activeTab === tab.key
                  ? "bg-stone-100 text-[#7E3132] text-xs"
                  : "text-gray-600 hover:text-[#7E3132]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-none hover:bg-stone-100 transition"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* --- Submenús dinámicos --- */}
      {isExpanded && (
        <div className="p-1 bg-white">
          {activeTab === "plantillas" && (
            <SubMenuPlantillas onSelectLayout={setSelectedLayout} />
          )}
          {activeTab === "texto" && (
            <SubMenuTexto editor={editorByBlock[selectedBlock]} />
          )}
          {activeTab === "recursos" && (
            <SubMenuRecursos onAddResource={handleAddResource} />
          )}
        </div>
      )}

      {/* --- Canvas del editor --- */}
      <EditorCanvas
        selectedLayout={selectedLayout}
        onEditorReady={handleEditorReady}
        setSelectedBlock={setSelectedBlock}
      />
    </div>
  );
}

