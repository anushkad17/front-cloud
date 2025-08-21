import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import API from "@/api/axios";

export default function FileUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const res = await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded * 100) / evt.total);
            setUploadProgress(pct);
          }
        },
      });

      toast({ title: "Uploaded", description: "File uploaded successfully." });
      if (onUpload) onUpload(res.data); // refresh file list
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data || "Upload failed.";
      toast({ title: "Error", description: String(msg), variant: "destructive" });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFiles = (files) => {
    const file = files?.[0];
    if (file) handleUpload(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <Card
      className={`p-6 border-dashed ${
        isDragging ? "border-primary bg-muted/40" : "border-muted"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center gap-3">
        <Upload className="h-8 w-8" />
        <p className="text-sm text-muted-foreground">Drag & drop to upload or</p>

        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          Choose file
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {isUploading && (
          <div className="w-full mt-4">
            <Progress value={uploadProgress} />
            <p className="text-xs text-muted-foreground mt-2">{uploadProgress}%</p>
          </div>
        )}
      </div>
    </Card>
  );
}
