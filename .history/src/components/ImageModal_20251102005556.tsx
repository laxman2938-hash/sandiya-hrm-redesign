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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-[95vw] max-h-[95vh] overflow-hidden animate-modal-in">
        {/* Minimal Header */}
        <div className="flex items-center justify-end p-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white">          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
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
        <div className="relative overflow-auto max-h-[calc(95vh-140px)] bg-gray-50">
          <div className="flex items-center justify-center min-h-[60vh] p-2">
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              style={{ maxWidth: '100%', maxHeight: 'calc(95vh - 140px)' }}
              onClick={() => setIsZoomed(!isZoomed)}
              onError={(e) => {
                console.error('Failed to load image:', imageUrl);
              }}
            />
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="p-2 bg-gray-50 border-t">
          <div className="text-center text-xs text-gray-500">
            Click image to zoom • Press ESC to close
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