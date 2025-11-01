'use client';

import { useEffect, useState } from 'react';
import { Achievement } from '@/types';
import { getMultilingualText } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import ImageModal from '@/components/ImageModal';

// Add animation styles
const animationStyles = `
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
`;

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Frontend: Fetching achievements from API...');
        const response = await fetch('/api/achievements');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Frontend: Achievements data received:', data.length || 0);
        setAchievements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('❌ Frontend: Failed to load achievements:', error);
        setError('Failed to load achievements');
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading amazing achievements...</div>
    </div>
  );
  if (error) return (
    <div className="text-center py-20 md:py-40 text-red-600 text-xl md:text-2xl">
      {error}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <style>{animationStyles}</style>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-blue-100">
              🏆 Our Legacy
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 leading-tight animate-fade-in-up">Achievements</h1>
            <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
              Celebrating our milestones and success stories across two decades
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Grid - Image Only */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
        

          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {achievements.map((achievement, idx) => (
                <div
                  key={achievement.id}
                  className="group relative overflow-hidden rounded-lg md:rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition transform hover:scale-105"
                  style={{ animation: `slideInUp 0.5s ease-out ${idx * 0.05}s forwards`, opacity: 0 }}
                  onClick={() => setSelectedImage({ url: achievement.image, title: achievement.title })}
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-200 to-blue-300 relative overflow-hidden">
                    {achievement.image ? (
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        loading="lazy"
                        onError={(e) => {
                          // If image fails to load, show fallback
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23dbeafe" width="400" height="400"/%3E%3Ctext x="50%" y="50%" font-size="80" fill="%231e40af" text-anchor="middle" dominant-baseline="middle"%3E🏆%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                        <div className="text-6xl md:text-7xl">🏆</div>
                      </div>
                    )}
                    
                    {/* Simple hover overlay - no text */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition bg-white/20 rounded-full p-4 backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Achievements Available</h3>
              <p className="text-gray-600 mb-4">
                Our achievements and awards will be displayed here when available.
              </p>
              <div className="text-sm text-gray-500">
                💡 We are continuously working towards excellence and recognition.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          description="Achievement Certificate - Click to zoom, press ESC to close"
        />
      )}
    </main>
  );
}
