'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { GalleryImage } from '@/types';
import { getMultilingualText } from '@/lib/utils';

export default function GalleryPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response: any = await api.getGallery();
        setImages(Array.isArray(response) ? response : response.data?.results || response.data || []);
      } catch (err) {
        setError(t('common.error'));
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [t]);

  const filteredImages = images;

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading gallery...</div>
    </div>
  );
  if (error) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-red-600">{error}</div>
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-blue-100">
            📸 Visual Stories
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 leading-tight animate-fade-in-up">Our Gallery</h1>
          <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
            Explore moments from our successful placements and company events
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-0 px-4 bg-white border-b border-blue-100">
      </section>

      {/* Gallery Grid - Advanced Responsive */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredImages.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative overflow-hidden rounded-lg md:rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition transform hover:scale-105"
                  style={{ animation: `slideInUp 0.5s ease-out ${idx * 0.05}s forwards`, opacity: 0 }}
                >
                  <div className="aspect-square bg-linear-to-br from-blue-200 to-blue-300">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition duration-500"
                      loading="lazy"
                    />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <div className="text-4xl md:text-6xl mb-4">🖼️</div>
              <p className="text-base md:text-xl text-slate-600">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg md:rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-900 flex items-center justify-center max-h-96 md:max-h-[600px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 hover:bg-white text-slate-900 w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center font-bold transition transform hover:scale-110 text-lg md:text-xl"
              >
                ✕
              </button>
            </div>
            {/* No title shown - photo only */}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  );
}
