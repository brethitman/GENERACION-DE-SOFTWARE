import  plantilla1  from '../../assets/plantilla1.png';
import  plantilla2  from '../../assets/plantilla2.png';

interface Props {
  onSelectLayout: (layoutId: number) => void;
}

export default function SubMenuPlantillas({ onSelectLayout }: Props) {
  const plantillas = [
    { id: 1, img: plantilla1 },
    { id: 2, img: plantilla2 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1">
      {plantillas.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelectLayout(p.id)}
          className="flex flex-col items-center justify-center
      w-20 h-20 p-2 border-1 border-[#7E3132] rounded-lg hover:bg-stone-100"
        >
          <img
            src={p.img}
            alt={`Plantilla ${p.id}`}
           className="w-full h-full object-cover rounded-lg"
          />
        </button>
      ))}
    </div>
  );
}


