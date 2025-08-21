import React, { useState, useEffect } from "react";
import { uploadFile, getMyFiles, deleteFile, downloadFile } from "../api/axios";

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  // Load files on mount
  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    try {
      setLoading(true);
      const myFiles = await getMyFiles();
      setFiles(myFiles);
    } catch (err) {
      setError("Failed to load files.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setProgress(0);
      const uploaded = await uploadFile(file, (percent) => setProgress(percent));
      console.log("Uploaded:", uploaded);
      await loadFiles(); // refresh list
    } catch (err) {
      setError("Failed to upload file.");
      console.error(err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteFile(id);
      await loadFiles();
    } catch (err) {
      setError("Failed to delete file.");
      console.error(err);
    }
  }

  async function handleDownload(id) {
    try {
      await downloadFile(id);
    } catch (err) {
      setError("Failed to download file.");
      console.error(err);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Files</h2>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Upload */}
      <div className="mb-4">
        <input type="file" onChange={handleUpload} disabled={uploading} />
        {uploading && (
          <div className="mt-2">
            Uploading: {progress}%
            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div
                className="bg-blue-500 h-2 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      {loading ? (
        <div>Loading files...</div>
      ) : (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <span>{file.originalName}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleDownload(file.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileManager;
