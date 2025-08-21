import { useEffect, useState } from "react";
import API from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// ✅ Human-readable file sizes
const humanSize = (bytes) => {
  if (bytes == null) return "-";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // ✅ Fetch files from backend
  const fetchFiles = async () => {
    try {
      const res = await API.get("/files");
      setFiles(res.data);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to load files.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ✅ Delete file
  const handleDelete = async (id) => {
    try {
      await API.delete(`/files/${id}`);
      toast({ title: "Deleted", description: "File removed successfully." });
      fetchFiles(); // refresh list
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to delete file.", variant: "destructive" });
    }
  };

  if (loading) return <Card className="p-6">Loading files…</Card>;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">My Files</h3>
      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">No files yet.</p>
      ) : (
        <div className="space-y-3">
          {files.map((file) => {
            const id = file.id || file.fileId || file.uuid || file._id;
            const name = file.fileName || file.name || file.originalName || file.filename || "Unnamed";
            const size = file.size || file.byteSize || file.length;
            const created = file.createdAt || file.uploadedAt || file.createdDate;

            return (
              <div key={id} className="flex items-center justify-between border rounded-md p-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{name}</div>
                  <div className="text-xs text-muted-foreground">
                    {humanSize(size)} {created ? `• ${new Date(created).toLocaleString()}` : ""}
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(id)}>
                  Delete
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
