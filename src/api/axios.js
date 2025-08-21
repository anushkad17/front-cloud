import axios from "axios";

// ✅ Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔹 Attach token to every request (Firebase ID token or any auth token)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Store Firebase ID token or your JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------------------- FILE APIs -------------------- //

/**
 * Upload a file
 * @param {File} file
 * @param {function} onProgress - optional callback for upload progress (0-100)
 */
export async function uploadFile(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await API.post("/files/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });

  return data; // CloudFile object with Firebase download URL
}

/**
 * Get all files of the logged-in user
 */
export async function getMyFiles() {
  const { data } = await API.get("/files");
  return data; // Array of CloudFile objects
}

/**
 * Delete a file by ID
 * @param {string} fileId - UUID of the file
 */
export async function deleteFile(fileId) {
  const { data } = await API.delete(`/files/${fileId}`);
  return data; // "File deleted successfully."
}

/**
 * Download a file by ID
 * @param {string} fileId - UUID of the file
 * Uses Firebase download URL returned from backend
 */
export async function downloadFile(fileId) {
  const { data: downloadUrl } = await API.get(`/files/${fileId}/download`);
  // data is Firebase download URL
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", "file"); // optionally replace with original filename if available
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// -------------------- EXPORT -------------------- //
export default API;
