'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GalleryImage } from '@/types';
import { getMultilingualText } from '@/lib/utils';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Frontend: Fetching gallery from API...');
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Frontend: Gallery data received:', data.length || 0);
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('❌ Frontend: Failed to load gallery:', error);
        setError('Failed to load gallery');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filteredImages = images;

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading gallery...</div>
    </div>
  );
  
  if (error) return (
    <main className="min-h-screen bg-white">
      <div className="text-center py-20 md:py-40">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">Failed to Load Gallery</h3>
        <p className="text-gray-600 mb-4">
          Unable to load gallery images. Please check your connection and try again.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    </main>
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

      {/* No Forced Bonded Labor Section */}
      <section className="py-12 md:py-20 px-4 bg-linear-to-r from-green-50 via-emerald-50 to-green-50 border-y-2 border-green-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Content */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-5xl">🚫</div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-900">No Forced Bonded Labor</h2>
              </div>
              
              <div className="space-y-4 mb-8">
                <p className="text-base md:text-lg text-slate-700 leading-relaxed text-justify">
                  At Sandiya HR, we are committed to ethical recruitment practices and strictly prohibit any form of forced or bonded labor. We believe every individual deserves dignity, freedom, and fair treatment.
                </p>
                
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">✓</span> Our Commitment
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-slate-700">
                    <li>✓ Zero tolerance for forced or bonded labor</li>
                    <li>✓ Fair wages and working conditions</li>
                    <li>✓ Freedom of association and movement</li>
                    <li>✓ Transparent employment contracts</li>
                    <li>✓ Regular compliance audits</li>
                    <li>✓ Confidential reporting mechanism</li>
                  </ul>
                </div>

                <div className="bg-green-100 p-4 rounded-lg border border-green-300">
                  <p className="text-sm md:text-base text-green-900 font-semibold">
                    💼 All our candidates are placed with proper legal documentation and protection under international labor laws.
                  </p>
                </div>
              </div>

              <Link
                href="/policy"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition transform hover:scale-105"
              >
                <span>Read Our Policy</span>
                <span>→</span>
              </Link>
            </div>

            {/* Right: Visual Badge */}
            <div className="order-1 md:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-linear-to-br from-green-400 to-emerald-400 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-green-200 text-center">
                  <div className="text-7xl md:text-8xl mb-4">🌍</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">Ethical Recruitment</h3>
                  <p className="text-slate-700 mb-6 text-sm md:text-base">
                    Fair, Transparent & Compliant with International Labor Standards
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                      <span className="text-2xl">✓</span>
                      <span>ILO Convention Compliant</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                      <span className="text-2xl">✓</span>
                      <span>Zero Cost Policy</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                      <span className="text-2xl">✓</span>
                      <span>Full Legal Protection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Impact & Values</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '10,000+', label: 'Workers Protected', icon: '👥' },
              { number: '100%', label: 'Legal Compliance', icon: '✓' },
              { number: '0', label: 'Forced Labor Cases', icon: '🚫' },
              { number: '50+', label: 'Countries Served', icon: '🌍' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-bold text-green-700 mb-2">{stat.number}</p>
                <p className="text-slate-700 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
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
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Gallery Images Available</h3>
              <p className="text-gray-600 mb-4">
                Photo gallery showcasing our work and achievements will appear here.
              </p>
              <div className="text-sm text-gray-500">
                💡 We are building our visual story collection.
              </div>
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
