'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDemandLetters } from '@/lib/data';
import { DemandLetter } from '@/types';

export default function ActiveDemandLetterPage() {
  const [demands, setDemands] = useState<DemandLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadDemandLetters = async () => {
      try {
        setLoading(true);
        setError(null);
        const letters = await getDemandLetters();
        setDemands(letters || []);
      } catch (error) {
        console.error('Failed to load demand letters:', error);
        setError('Failed to load demand letters');
        setDemands([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadDemandLetters();
  }, []);

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading demand letters...</div>
    </div>
  );
  
  if (error) return (
    <main className="min-h-screen bg-white">
      <div className="text-center py-20 md:py-40">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">Failed to Load Demand Letters</h3>
        <p className="text-gray-600 mb-4">
          Unable to load demand letters. Please check your connection and try again.
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Active Demand Letters</h1>
          <p className="text-xl text-blue-100">
            Current job opportunities from our partner employers worldwide
          </p>
        </div>
      </section>

      {/* Demand Letters Grid - Image Only */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {demands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demands.map((demand) => (
                <button
                  key={demand.id}
                  onClick={() => demand.image && setSelectedImage(demand.image)}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
                >
                  <div className="relative bg-slate-200 h-96 overflow-hidden">
                    {demand.image ? (
                      <img
                        src={demand.image}
                        alt={demand.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200">
                        <div className="text-6xl">📄</div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">�</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Demand Letters</h3>
              <p className="text-gray-600 mb-4">
                Current job opportunities from our partner employers will be displayed here when available.
              </p>
              <div className="text-sm text-gray-500">
                💡 Check back regularly for new employment opportunities.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition z-60"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Fullscreen demand letter"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Click anywhere to close hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
            Click outside or press ✕ to close
          </div>
        </div>
      )}
    </main>
  );
}
