'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { DemandLetter } from '@/types';

export default function ActiveDemandLetterPage() {
  const [demands, setDemands] = useState<DemandLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDemandLetters = async () => {
      try {
        setLoading(true);
        const response: any = await api.getDemandLetters();
        const data = Array.isArray(response) ? response : response.data?.results || response.data || [];
        setDemands(data);
      } catch (err) {
        setError('Error fetching demand letters');
        console.error('Error fetching demand letters:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDemandLetters();
  }, []);

  if (loading) return <div className="text-center py-40 text-2xl">Loading...</div>;
  if (error) return <div className="text-center py-40 text-2xl text-red-600">{error}</div>;

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
              <div className="text-5xl md:text-7xl mb-4">📭</div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">No Active Demand Letters</h2>
              <p className="text-base md:text-lg text-slate-600">No job opportunities are available at the moment. Please check back later.</p>
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
