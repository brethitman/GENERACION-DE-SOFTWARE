export async function SubirImagen(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://generacionback.vercel.app/api/cloudinary/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.url) throw new Error("Error al subir a Cloudinary");

  return data.url;
}
