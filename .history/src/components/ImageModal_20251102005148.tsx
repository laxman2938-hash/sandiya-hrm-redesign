'use client';

import { useEffect } from 'react';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description?: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, title, description }: ImageModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl max-h-[90vh] overflow-hidden animate-modal-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold truncate">{title}</h3>
            {description && (
              <p className="text-blue-100 text-sm mt-1 line-clamp-2">{description}</p>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Download Image"
            >
              <Download size={18} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Close (ESC)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative overflow-auto max-h-[calc(90vh-80px)] bg-gray-50">
          <div className="flex items-center justify-center min-h-[400px] p-4">
            <img
              src={imageUrl}
              alt={title}
              className={`max-w-full max-h-full object-contain rounded-lg shadow-lg transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              onError={(e) => {
                console.error('Failed to load image:', imageUrl);
              }}
            />
          </div>
        </div>

        {/* Footer with additional info */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Click image to zoom • Press ESC to close</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Achievement Certificate
            </span>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modal-in {
          animation: modal-in 0.2s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}