'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TeamMember } from '@/types';
import type { Metadata } from 'next';

// Note: This is a client component, metadata should ideally be in a layout
// For SEO purposes, consider creating a separate metadata file

export default function AboutUsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team-members');
        const data = await response.json();
        if (data.success && data.data) {
          setTeamMembers(data.data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-blue-100">We believe investing in people is our strength and asset.</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Our Story</h2>
            <p className="text-xl text-slate-600">Building a culture of excellence and trust</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-blue-600">We believe investing in people is our strength and asset.</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Alongside providing better employment opportunities for individuals seeking to work abroad, we take pride in the strong and supportive culture we have built at Sandiya Human Resources Pvt. Ltd. This culture reflects the vision and leadership of our team, which brings over 10 years of experience across various industries.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Many of our team members have been with us since the company's inception—a testament to the positive work environment and values fostered by our leadership.
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl overflow-hidden shadow-2xl h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-7xl mb-4">🌍</div>
                <p className="text-2xl font-bold">Connecting Global Talent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Our Team</h2>
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Experienced, Trusted, Dedicated Recruitment Experts</h3>
            <p className="text-xl text-slate-600">A team of experienced professionals committed to ethical and effective recruitment</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-10">Loading team members...</div>
            ) : teamMembers.length > 0 ? (
              teamMembers.map((member, idx) => (
                <div
                  key={member.id}
                  className="bg-linear-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-2xl p-6 md:p-8 hover:shadow-lg transition transform hover:-translate-y-2 text-center w-full"
                >
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        width={96} 
                        height={96}
                        priority={false}
                        loading="lazy"
                        unoptimized
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          // Fallback to initials if image fails
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-white text-3xl font-bold">${member.name.charAt(0)}</span>`;
                          }
                        }}
                      />
                    ) : (
                      <span className="text-white text-3xl font-bold">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">{member.name}</h3>
                  <p className="text-sm font-semibold text-blue-600">
                    {member.designation}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">No team members found</div>
            )}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Community</h2>
          </div>

          <div className="bg-linear-to-br from-slate-50 to-blue-50 border-2 border-blue-100 rounded-2xl p-8 md:p-12">
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Through our philanthropic initiatives, we strive to empower communities and create a meaningful, positive impact. Our internally driven and community-focused campaigns reflect our commitment to being a socially responsible organization.
            </p>

            <h3 className="text-xl font-bold mb-6 text-slate-900">Some of the initiatives we have undertaken include:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-xl text-blue-600 font-bold">•</span>
                <p className="text-slate-700 text-lg">Active donation campaigns during natural disasters such as floods and earthquakes.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xl text-blue-600 font-bold">•</span>
                <p className="text-slate-700 text-lg">Regular support to local orphanages and charitable organizations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
