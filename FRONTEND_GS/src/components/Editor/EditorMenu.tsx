import type { JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/react';
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import type { Topico } from "../../types/Topico";

import EditorCanvas from "./EditorCanvas";
import SubMenuPlantillas from "./SubMenuPlantillas";
import SubMenuRecursos from "./SubMenuRecursos";
import SubMenuTexto from "./SubMenuTexto";

type SubMenu = "plantillas" | "texto" | "recursos";

interface EditorMenuProps {
  topico?: Topico;
}

export interface EditorMenuRef {
  getTopicoJSON: () => Topico | null;
}

const EditorMenu = forwardRef<EditorMenuRef, EditorMenuProps>(({ topico }, ref) => {
  const [activeTab, setActiveTab] = useState<SubMenu>("plantillas");
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [editorByBlock, setEditorByBlock] = useState<{ [key: number]: Editor }>({});
  const [selectedBlock, setSelectedBlock] = useState<number>(0);

  const handleEditorReady = (editor: Editor, index: number) => {
    setEditorByBlock((prev) => ({ ...prev, [index]: editor }));
  };

  const handleAddResource = (resource: { type: "html" | "image"; content: string }) => {
    const editor = editorByBlock[selectedBlock];
    if (!editor) return;
    if (resource.type === "image") editor.commands.insertContent(`<img src="${resource.content}" alt="imagen" />`);
    else editor.commands.insertContent(resource.content);
  };

  const getTopicoJSON = (): Topico | null => {
    if (!topico) return null;

    const bloques: Topico["contenido"]["bloques"] = Object.keys(editorByBlock).map((key) => {
      const editor = editorByBlock[Number(key)];
      return {
        id: Number(key),
        tipo: "texto" as const,
        html: editor?.getHTML() ?? "",
        tiptap: editor?.getJSON() ?? { type: "doc", content: [] } as JSONContent,
        textoPlano: editor?.getText() ?? "",
      };
    });

    return {
      ...topico,
      contenido: { bloques },
      creadoEn: topico.creadoEn ?? new Date().toISOString(),
    };
  };

  useImperativeHandle(ref, () => ({ getTopicoJSON }));

  useEffect(() => {
    if (!topico?.contenido?.bloques) return;
    if (Object.keys(editorByBlock).length === 0) return;

    topico.contenido.bloques.forEach((bloque, i) => {
      const editor = editorByBlock[i];
      if (!editor) return;
      if (bloque.tiptap) editor.commands.setContent(bloque.tiptap);
      else if (bloque.html) editor.commands.setContent(bloque.html);
      else editor.commands.setContent("");
    });
  }, [topico, editorByBlock]);

  const tabs = [
    { key: "plantillas", label: "Plantillas" },
    { key: "texto", label: "Texto" },
    { key: "recursos", label: "Recursos" },
  ] as const;

  return (
    <div className="bg-white shadow-sm h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center justify-between border-b bg-gray-50">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-none text-xs transition ${activeTab === tab.key ? "bg-stone-100 text-[#7E3132]" : "text-gray-600 hover:text-[#7E3132]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} className="rounded-none hover:bg-stone-100 transition">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-1 bg-white">
          {activeTab === "plantillas" && <SubMenuPlantillas onSelectLayout={setSelectedLayout} />}
          {activeTab === "texto" && <SubMenuTexto editor={editorByBlock[selectedBlock]} />}
          {activeTab === "recursos" && <SubMenuRecursos onAddResource={handleAddResource} />}
        </div>
      )}

      <EditorCanvas
        selectedLayout={selectedLayout}
        onEditorReady={handleEditorReady}
        setSelectedBlock={setSelectedBlock}
        topico={topico}
      />
    </div>
  );
});

export default EditorMenu;
