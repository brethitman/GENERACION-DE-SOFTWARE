import { useRef } from "react";
import { BiSolidImageAdd } from "react-icons/bi";

import { SubirImagen } from "./Recursos/SubirImagen";

interface Props {
  onAddResource: (resource: { type: "html" | "image"; content: string }) => void;
}

export default function SubMenuRecursos({ onAddResource }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      try {
        const imageUrl = await SubirImagen(file); // ⬅️ que devuelva la URL de la imagen
        onAddResource({ type: "image", content: imageUrl });
      } catch (error) {
        console.error("Error al subir imagen:", error);
      }
    } else {
      alert("Solo se admiten imágenes por ahora.");
    }

    e.target.value = "";
  };

  const handleAddImage = () => fileInputRef.current?.click();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 p-2">
      <button
        onClick={handleAddImage}
        className="flex flex-col items-center justify-center w-20 h-20 p-2 border border-[#7E3132] rounded-lg hover:bg-stone-100"
      >
        <BiSolidImageAdd size={28} className="text-[#7E3132]" />
        <span className="text-xs text-gray-700 font-medium">Agregar Imagen</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
