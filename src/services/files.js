import api from "./http";

export async function listFiles() {
  const { data } = await api.get("/files");
  return data;
}

export async function uploadFile(file, onUploadProgress) {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post("/files/upload", fd, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
  return data;
}

export async function deleteFile(fileId) {
  const { data } = await api.delete(`/files/${fileId}`);
  return data;
}
