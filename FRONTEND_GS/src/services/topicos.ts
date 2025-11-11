import type { Topico } from "../types/Topico";

export async function fetchTopicos(): Promise<Topico[]> {
  const res = await fetch("http://localhost:3000/topicos");
  if (!res.ok) throw new Error("Error al obtener los tópicos");
  const data = await res.json();
  return data.topicos.map((t: Topico) => ({
    ...t,
    contenido: t.contenido ?? { bloques: [] }, // 🔹 asegurar contenido
  }));
}

export async function fetchTopicoPorId(idTopico: string): Promise<Topico> {
  const res = await fetch(`http://localhost:3000/topicos/${encodeURIComponent(idTopico)}`);
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.mensaje || `Error ${res.status} al obtener el tópico`);
  }

  const data = await res.json();
  if (!data.ok || !data.topico) throw new Error(data.mensaje || "Error al obtener el tópico");

  const topico = data.topico as Topico;
  return {
    ...topico,
    contenido: topico.contenido ?? { bloques: [] }, // 🔹 siempre definido
  };
}

export async function actualizarTopico(
  id: string,
  datos: Partial<Pick<Topico, "titulo" | "contenido" | "orden">>
): Promise<Topico> {
  const res = await fetch(`http://localhost:3000/topicos/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.mensaje || `Error ${res.status} al actualizar el tópico`);
  }

  const data = await res.json();
  if (!data.ok || !data.topico) throw new Error(data.mensaje || "Error al actualizar el tópico");

  const topico = data.topico as Topico;
  return {
    ...topico,
    contenido: topico.contenido ?? { bloques: [] }, // 🔹 asegurar contenido
  };
}
