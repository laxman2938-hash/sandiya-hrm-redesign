'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { EmploymentCategory } from '@/types';
import { getMultilingualText } from '@/lib/utils';
import Link from 'next/link';

export default function EmploymentCategoriesPage() {
  const [categories, setCategories] = useState<EmploymentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response: any = await api.getEmploymentCategories();
        setCategories(Array.isArray(response) ? response : response.data?.results || response.data || []);
      } catch (err) {
        setError('Error fetching employment categories. Please try again.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading employment categories...</div>
    </div>
  );
  if (error) return (
    <div className="text-center py-20 md:py-40 text-red-600 text-xl md:text-2xl">{error}</div>
  );

  const defaultEmploymentTypes = [
    {
      icon: '📋',
      title: 'Permanent Employees',
      description: 'Long-term employment opportunities with full-time positions, offering job security, benefits, and career growth.',
      features: ['Stable employment', 'Full benefits package', 'Career advancement', 'Job security'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📝',
      title: 'Contract Employees',
      description: 'Fixed-term employment for specific projects or durations, with clear contract terms and conditions.',
      features: ['Fixed-term engagement', 'Clear terms', 'Project-based work', 'Competitive rates'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⏰',
      title: 'Temporary Employees',
      description: 'Flexible temporary positions to meet immediate business needs, ideal for seasonal or short-term work.',
      features: ['Flexible timeline', 'Immediate deployment', 'Easy hiring process', 'Test-and-hire option'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🕐',
      title: 'Part-Time Employees',
      description: 'Part-time work opportunities perfect for those seeking flexible schedules and supplementary income.',
      features: ['Flexible hours', 'Work-life balance', 'Multiple benefits', 'Easy scheduling'],
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-blue-100">
              💼 Career Options
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 leading-tight animate-fade-in-up">Employment Categories</h1>
            <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
              Explore diverse employment types and find what suits you best
            </p>
          </div>
        </div>
      </section>

      {/* Employment Categories from Database */}
      {categories && categories.length > 0 && (
        <section className="py-12 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-slate-900">Available Positions</h2>
            <p className="text-center text-slate-600 mb-12 text-base md:text-lg">Browse our current employment opportunities</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category: any, idx: number) => (
                <div
                  key={category.id || idx}
                  className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  style={{ animation: `slideInUp 0.6s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
                >
                  {/* Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden bg-slate-100">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-indigo-100">
                        <span className="text-4xl">💼</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 md:p-6 bg-white">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                      {category.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {category.description || 'Explore this employment opportunity'}
                    </p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Employment Types Section - Advanced Grid */}
      <section className={`${categories && categories.length > 0 ? 'py-12 md:py-20 px-4 bg-slate-50' : 'py-12 md:py-24 px-4 bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-slate-900">
            {categories && categories.length > 0 ? 'Employment Types' : 'Available Employment Types'}
          </h2>
          <p className="text-center text-slate-600 mb-12 text-base md:text-lg">Different employment options to match your career goals</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {defaultEmploymentTypes.map((type, idx) => (
              <div
                key={idx}
                className="group relative h-full rounded-xl md:rounded-2xl overflow-hidden"
                style={{ animation: `slideInUp 0.6s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
              >
                {/* Background */}
                <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-blue-50 group-hover:opacity-0 transition duration-300"></div>
                <div className={`absolute inset-0 bg-linear-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition duration-300`}></div>
                
                {/* Content */}
                <div className="relative p-4 md:p-8 rounded-xl md:rounded-2xl border border-blue-100 group-hover:border-transparent transition h-full flex flex-col">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-125 transition">{type.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900 group-hover:text-white transition">{type.title}</h3>
                  <p className="text-xs md:text-sm text-slate-700 group-hover:text-white/90 transition mb-4 md:mb-6 grow">{type.description}</p>
                  <div className="space-y-1 md:space-y-2">
                    {type.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-700 group-hover:text-white/90 transition">
                        <span className="text-blue-600 group-hover:text-white/70 mt-0.5 shrink-0">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!categories || categories.length === 0) && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg mb-2">📭 No specific employment categories available right now.</p>
              <p className="text-slate-500">Please check back later for available positions.</p>
            </div>
          )}
        </div>
      </section>

    

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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
