"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { validateImageFile } from "@/lib/imageUpload";

interface FileInputProps {
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  helperText?: string;
  onFileSelect?: (file: File) => void;
}

export function FileInput({
  name,
  label,
  required = false,
  accept = "image/jpeg,image/png,image/webp,image/gif",
  helperText = "Supported formats: JPEG, PNG, WebP, GIF (Max 5MB)",
  onFileSelect,
}: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      setPreview(null);
      setFileName("");
      return;
    }

    setError("");
    setFileName(file.name);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Notify parent component
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setError("");
    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Preview */}
      {preview && (
        <div className="mb-4 relative">
          <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Selected: {fileName}</p>
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setFileName("");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="mt-2 px-3 py-1 bg-gray-300 text-gray-900 text-xs font-medium rounded hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      )}

      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
      >
        <input
          ref={fileInputRef}
          id={name}
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          required={required}
          className="hidden"
        />

        <div onClick={() => fileInputRef.current?.click()}>
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-12-8l6 6m6-6l-6 6m-6-6v16"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-gray-700 font-medium">Drag and drop your image here</p>
          <p className="text-gray-500 text-sm">or click to select</p>
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-600 mt-2">{helperText}</p>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
