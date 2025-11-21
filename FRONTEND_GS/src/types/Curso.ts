import type { Topico } from "../types/Topico";

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string | null;
  publicado: boolean;
  creado_desde_id: string | null;
  topicos?: Topico[];
}
