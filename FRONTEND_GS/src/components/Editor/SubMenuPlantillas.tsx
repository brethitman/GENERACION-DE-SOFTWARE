import { useState } from "react";
import { FaSquareFull } from "react-icons/fa";
import { TfiLayoutColumn2Alt } from "react-icons/tfi";

interface Props {
  onSelectLayout: (layoutId: number) => void;
}

export default function SubMenuPlantillas({ onSelectLayout }: Props) {
  const plantillas = [
    { id: 0, icon: FaSquareFull },
    { id: 1, icon: TfiLayoutColumn2Alt },
  ];

  const [activo, setActivo] = useState<number>(0);

  const handleClick = (id: number) => {
    setActivo(id);           
    onSelectLayout(id);      
  };

  return (
    <div className="flex gap-2 p-2">
      {plantillas.map((p) => {
        const IconComponent = p.icon;
        const isActive = p.id === activo; // verifica si es el botón activo
        return (
          <button
            key={p.id}
            onClick={() => handleClick(p.id)}
            className={`flex items-center justify-center
                        w-20 h-20 p-2 border rounded-lg transition
                        ${isActive ? "border-[#7E3132] text-[#7E3132] shadow-lg" : "border-stone-700 hover:bg-stone-100 text-stone-700"}`}
          >
            <IconComponent className="w-10 h-10" />
          </button>
        );
      })}
    </div>
  );
}



