import api from "../../../services/api"; 

export async function SubirImagen(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    // ✅ Reemplazamos fetch por api.post
    // ✅ Axios detecta automáticamente que es FormData y pone los headers correctos
    const { data } = await api.post("/api/cloudinary/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.url) throw new Error("Error al subir a Cloudinary");

    return data.url;
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error;
  }
}