'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  folder?: string;
  preview?: string;
  label?: string;
}

export default function ImageUploader({
  onUpload,
  folder = 'general',
  preview,
  label = 'Upload Image'
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState(preview);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        onUpload(data.url);
        setError('');
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* Preview */}
      {previewUrl && (
        <div className="relative w-full h-40 bg-slate-100 rounded-lg overflow-hidden">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Upload Input */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            cursor-pointer
            disabled:opacity-50"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
          Uploading image...
        </div>
      )}
    </div>
  );
}
