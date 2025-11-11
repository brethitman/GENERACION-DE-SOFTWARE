import type { JSONContent } from '@tiptap/core';

export type Posicion = { x: number; y: number; w: number; h: number };

// Bloque editable TipTap
export type Bloque = {
  id?: number;
  tipo: "texto";            // literal "texto" obligatorio
  tiptap: JSONContent;      // documento TipTap
  html: string;             // snapshot HTML
  textoPlano: string;       // texto plano
  posicion?: Posicion;      // opcional si quieres layouts absolutos
};

export type ContenidoTopico = {
  bloques: Bloque[];
};

export type Topico = {
  id: string;
  idCurso: string;
  titulo: string;
  contenido: ContenidoTopico;   // siempre definido
  orden: number;
  creadoEn: string;
};

