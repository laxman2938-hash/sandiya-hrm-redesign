'use client';

import Link from 'next/link';

interface Mission {
  title: string;
  description: string;
}

export default function WhoWeArePage() {

  const missions: Mission[] = [
    {
      title: 'Our Mission',
      description: 'To create opportunities that empower individuals to achieve their career goals while supporting organizations with the right talent. We provide fair, ethical, and zero-cost recruitment services.',
    },
    {
      title: 'Our Vision',
      description: 'To be Nepal\'s leading ethical recruitment agency recognized globally for connecting exceptional talent with meaningful opportunities, fostering sustainable career growth.',
    },
    {
      title: 'Our Commitment',
      description: 'We are dedicated to providing fair, ethical, and zero-cost recruitment services. By fostering ethical recruitment practices, we deliver long-term value to candidates and employers.',
    },
  ];

  const features = [
    { icon: '🔒', title: 'Zero-Cost Policy', description: 'Fair recruitment without financial burden' },
    { icon: '🌍', title: 'Global Network', description: 'Connect with employers worldwide' },
    { icon: '📋', title: 'Ethical Standards', description: 'Transparent and responsible practices' },
    { icon: '🎯', title: 'Perfect Match', description: 'Right job for the right person' },
    { icon: '💼', title: 'Professional Support', description: 'Expert guidance throughout your journey' },
    { icon: '🏆', title: 'Proven Track Record', description: 'Thousands of successful placements' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Who We Are</h1>
          <p className="text-xl text-blue-100">
            Leading foreign recruitment agency committed to ethical practices and global success
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((mission, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl border-l-4 border-blue-600 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-900">{mission.title}</h3>
                <p className="text-slate-700 leading-relaxed">{mission.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Content */}
      <section className="py-24 px-4 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-slate-900">Leading foreign recruitment agency</h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Sandiya Human Resources Pvt. Ltd. offers zero-cost recruitment services to empower candidates to join the global workforce while connecting the right talent with the right job.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                We have built a strong reputation in the recruitment industry through our commitment to fair practices. We follow a zero-cost recruitment policy, ensuring candidates can join the global workforce without financial barriers.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our mission is to connect the right people with the right opportunities, enabling individuals to reach their full potential while delivering outstanding results for organizations worldwide.
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl p-12 text-white h-96 flex items-center justify-center hover:shadow-2xl transition">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold">Global Recruitment Leader</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Why Choose Sandiya HR?</h2>
            <p className="text-xl text-slate-600">We're committed to your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
