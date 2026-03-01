import { useState, useRef } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

interface DragDropUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedFormats?: string[];
}

export default function DragDropUpload({
  onFilesSelected,
  maxFiles = 10,
  maxFileSize = 10,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: DragDropUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const errors: string[] = [];
    const valid: File[] = [];

    if (files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed at once`);
    }

    files.forEach((file) => {
      if (!acceptedFormats.includes(file.type)) {
        errors.push(`${file.name}: Invalid file format`);
        return;
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxFileSize) {
        errors.push(`${file.name}: File size exceeds ${maxFileSize}MB limit`);
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const { valid, errors } = validateFiles(files);

    if (errors.length > 0) {
      errors.forEach((error) => {
        const errorFile: UploadFile = {
          file: new File([], "error"),
          id: Math.random().toString(36),
          progress: 0,
          status: "error",
          error,
        };
        setUploadFiles((prev) => [...prev, errorFile]);
      });
    }

    if (valid.length > 0) {
      const newFiles: UploadFile[] = valid.map((file) => ({
        file,
        id: Math.random().toString(36),
        progress: 0,
        status: "pending",
      }));
      setUploadFiles((prev) => [...prev, ...newFiles]);
      onFilesSelected(valid);
    }
  };

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const updateProgress = (id: string, progress: number, status: UploadFile["status"]) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, progress, status } : f))
    );
  };

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "uploading":
        return <Upload className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Upload className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragActive
            ? "border-accent bg-accent/10"
            : "border-border bg-secondary/30 hover:border-accent/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(",")}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <Upload className="w-8 h-8 text-accent" />
          <div>
            <p className="font-heading font-semibold text-foreground">
              Drag and drop images here
            </p>
            <p className="text-sm text-muted-foreground">
              or{" "}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-accent hover:underline font-semibold"
              >
                browse files
              </button>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Max {maxFiles} files, {maxFileSize}MB each
          </p>
        </div>
      </div>

      {/* File List */}
      {uploadFiles.length > 0 && (
        <Card className="p-4 space-y-3">
          <h3 className="font-heading font-semibold text-foreground">
            Files ({uploadFiles.length})
          </h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {uploadFiles.map((uploadFile) => (
              <div
                key={uploadFile.id}
                className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg"
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(uploadFile.status)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {uploadFile.file.name || uploadFile.error}
                    </p>
                    {uploadFile.status !== "error" && (
                      <span className="text-xs text-muted-foreground">
                        {uploadFile.progress}%
                      </span>
                    )}
                  </div>

                  {uploadFile.status !== "error" && uploadFile.status !== "pending" && (
                    <Progress value={uploadFile.progress} className="h-1" />
                  )}

                  {uploadFile.error && (
                    <p className="text-xs text-red-500">{uploadFile.error}</p>
                  )}
                </div>

                <button
                  onClick={() => removeFile(uploadFile.id)}
                  className="flex-shrink-0 p-1 hover:bg-secondary rounded transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export type { UploadFile };
