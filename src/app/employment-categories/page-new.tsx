'use client';

export default function EmploymentCategoriesPage() {
  // Static employment categories data
  const categories = [
    {
      id: 1,
      title: 'Permanent Employees',
      description: 'Long-term employment opportunities with full-time positions, offering job security, benefits, and career growth.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      icon: '👔'
    },
    {
      id: 2,
      title: 'Contract Employees',
      description: 'Fixed-term employment for specific projects or durations, with clear contract terms and conditions.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-100',
      icon: '📋'
    },
    {
      id: 3,
      title: 'Temporary Employees',
      description: 'Flexible temporary positions to meet immediate business needs, ideal for seasonal or short-term work.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-green-100',
      icon: '⏱️'
    },
    {
      id: 4,
      title: 'Part-Time Employees',
      description: 'Part-time work opportunities perfect for those seeking flexible schedules and supplementary income.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBg: 'hover:bg-orange-100',
      icon: '🕐'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-28 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Employment Categories</h1>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Explore our diverse employment options tailored to match your career goals
          </p>
        </div>
      </section>

      {/* Employment Categories Grid */}
      <section className="py-16 md:py-28 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className={`${cat.bgColor} ${cat.hoverBg} border-2 ${cat.borderColor} rounded-2xl p-8 md:p-10 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl`}
                style={{ 
                  animation: `slideInUp 0.6s ease-out ${idx * 0.12}s forwards`, 
                  opacity: 0 
                }}
              >
                <div className={`bg-linear-to-br ${cat.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <span className="text-3xl">{cat.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{cat.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">{cat.description}</p>
                <button className={`bg-linear-to-r ${cat.color} text-white font-semibold py-3 px-6 rounded-lg w-full hover:shadow-lg transition transform hover:scale-105`}>
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Role?</h2>
          <p className="text-lg text-blue-100 mb-10">Connect with us to explore opportunities that match your skills</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-block bg-white text-blue-900 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition">
              Get in Touch
            </a>
            <a href="/" className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition">
              Home
            </a>
          </div>
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
      `}</style>
    </main>
  );
}
