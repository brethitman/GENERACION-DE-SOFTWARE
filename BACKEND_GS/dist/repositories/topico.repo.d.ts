export type Topico = {
    id: string;
    idCurso: string;
    titulo: string;
    contenido?: any;
    orden: number;
    creadoEn: Date;
};
export declare function crearTopico(params: {
    idCurso: string;
    titulo: string;
    contenido?: any;
    orden?: number;
}): Promise<Topico>;
export declare function listarTopicos(): Promise<Topico[]>;
export declare function buscarTopicoPorId(id: string): Promise<Topico | null>;
export declare function actualizarTopico(params: {
    id: string;
    titulo?: string;
    contenido?: any;
    orden?: number;
}): Promise<Topico | null>;
export declare function insertarTopicoDespuesDe(params: {
    idCurso: string;
    titulo: string;
    contenido?: any;
    afterTopicoId?: string | null;
}): Promise<Topico>;
//# sourceMappingURL=topico.repo.d.ts.map