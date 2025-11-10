export type Posicion = { x: number; y: number; w: number; h: number };

export type Bloque = {
  tipo: "texto" | "imagen" | "html"; // puedes agregar más tipos si es necesario
  html?: string;
  url?: string;
};

export type ContenidoTopico = {
  bloques: Bloque[];
};

export type Topico = {
  id: string;
  idCurso: string;
  titulo: string;
  contenido?: ContenidoTopico;
  orden: number;
  creadoEn: string;
};
