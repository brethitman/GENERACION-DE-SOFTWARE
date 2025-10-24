import { useState, useRef, useEffect } from "react";

interface UserDropdownProps {
  nombre: string;
  rol: string;
  avatarUrl?: string;
  onLogout: () => void;
}

export default function UserDropdown({ nombre, rol, avatarUrl, onLogout }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = nombre
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 bg-white text-stone-800 hover:bg-stone-100 transition"
      >

        <div className="flex flex-col items-start">
          <span className="text-[#7E3132] text-xs">{rol}</span>
          <span className="font-semibold text-sm">{nombre}</span>
        </div>

        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={nombre}
            className="w-8 h-8 rounded-full object-cover border border-stone-300"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#7E3132] flex items-center justify-center text-white font-semibold">
            {initials}
          </div>
        )}
        </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-stone-100 border border-stone-300 shadow-lg z-50">
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-200 ">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );

}
