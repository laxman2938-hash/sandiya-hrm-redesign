'use client';

import { useState, useEffect } from 'react';
import { Client } from '@/types';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Frontend: Fetching clients from API...');
        const response = await fetch('/api/clients');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Frontend: Clients data received:', data.length || 0);
        setClients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('❌ Frontend: Failed to load clients:', error);
        setError('Failed to load clients');
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading clients...</div>
    </div>
  );
  if (error) return (
    <main className="min-h-screen bg-white">
      <div className="text-center py-20 md:py-40">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">Failed to Load Clients</h3>
        <p className="text-gray-600 mb-4">
          Unable to load client information. Please check your connection and try again.
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
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-blue-100">
              🤝 Our Partners
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 leading-tight animate-fade-in-up">Our Clients</h1>
            <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
              Trusted by leading organizations across Nepal and the globe
            </p>
          </div>
        </div>
      </section>

      {/* Clients Grid - Advanced Responsive */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
         

          {clients.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {clients.map((client, idx) => (
                <div
                  key={client.id}
                  className="group"
                  style={{ animation: `slideInUp 0.6s ease-out ${idx * 0.05}s forwards`, opacity: 0 }}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-lg md:rounded-2xl p-3 md:p-6 hover:shadow-lg transition transform hover:-translate-y-2 hover:border-blue-300 h-full flex flex-col items-center justify-center">
                    <div className="w-full h-16 md:h-24 flex items-center justify-center mb-2 md:mb-4">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition"
                      />
                    </div>
                    {/* <p className="text-xs md:text-sm font-semibold text-slate-900 text-center line-clamp-2">{client.name}</p> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Clients Available</h3>
              <p className="text-gray-600 mb-4">
                Our client partnerships and logos will be displayed here when available.
              </p>
              <div className="text-sm text-gray-500">
                💡 We are actively building partnerships with leading organizations.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Partnership Section */}
      <section className="py-12 md:py-24 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">Strategic Partnerships</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900">Why Partner With Us?</h2>
              <p className="text-sm md:text-lg text-slate-700 mb-4 md:mb-6 leading-relaxed text-justify">
                We have established trusted partnerships with leading organizations across multiple industries. Our clients value our commitment to excellence, reliability, and delivering top-tier talent.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  '500+ Global Client Network',
                  '10+ Years of Industry Experience',
                  'Dedicated Account Management'
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl text-blue-600 shrink-0">✓</span>
                    <span className="text-sm md:text-base text-slate-700 font-semibold">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl p-8 md:p-12 text-white text-center h-64 md:h-96 flex items-center justify-center">
              <div>
                <div className="text-5xl md:text-7xl mb-3 md:mb-4">🤝</div>
                <p className="text-lg md:text-2xl font-bold">Building Long-term Relationships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    



      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
    </main>
  );
}
