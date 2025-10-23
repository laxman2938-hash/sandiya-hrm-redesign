'use client';

export default function EmploymentCategoriesPage() {
  // Static employment categories data matching sandiyahrm.com design
  const employmentCategories = [
    {
      id: 1,
      title: 'Permanent Employees',
      description: 'Long-term employment opportunities with full-time positions, offering job security, benefits, and career growth.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100'
    },
    {
      id: 2,
      title: 'Contract Employees',
      description: 'Fixed-term employment for specific projects or durations, with clear contract terms and conditions.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-100'
    },
    {
      id: 3,
      title: 'Temporary Employees',
      description: 'Flexible temporary positions to meet immediate business needs, ideal for seasonal or short-term work.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      hoverBg: 'hover:bg-green-100'
    },
    {
      id: 4,
      title: 'Part-Time Employees',
      description: 'Part-time work opportunities perfect for those seeking flexible schedules and supplementary income.',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      hoverBg: 'hover:bg-orange-100'
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-28 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Employment Categories</h1>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Explore our diverse employment options tailored to match your career goals
          </p>
        </div>
      </section>

      {/* Employment Categories Grid - Clean Card Layout */}
      <section className="py-16 md:py-28 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {employmentCategories.map((category, idx) => (
              <div
                key={category.id}
                className={`${category.bgColor} ${category.hoverBg} border-2 ${category.borderColor} rounded-2xl p-8 md:p-10 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl`}
                style={{ 
                  animation: `slideInUp 0.6s ease-out ${idx * 0.12}s forwards`, 
                  opacity: 0 
                }}
              >
                {/* Category Header */}
                <div className={`bg-linear-to-br ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition`}>
                  <span className="text-3xl text-white">
                    {category.id === 1 && '👔'}
                    {category.id === 2 && '📋'}
                    {category.id === 3 && '⏱️'}
                    {category.id === 4 && '🕐'}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{category.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Learn More Button */}
              
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Choose What Works For You</h2>
          <p className="text-center text-slate-600 text-lg mb-12 max-w-2xl mx-auto">
            Each employment category offers unique benefits and flexibility. Select the option that aligns best with your career aspirations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {employmentCategories.map((category) => (
              <div key={category.id} className="flex gap-4">
                <div className={`bg-linear-to-br ${category.color} w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}>
                  <span className="text-2xl text-white">
                    {category.id === 1 && '✓'}
                    {category.id === 2 && '✓'}
                    {category.id === 3 && '✓'}
                    {category.id === 4 && '✓'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-linear-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Role?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Connect with us today to explore employment opportunities that match your skills and ambitions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-white text-blue-900 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition transform hover:scale-105"
            >
              Get in Touch
            </a>
            <a
              href="/"
              className="inline-block border-2 border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition"
            >
              Back to Home
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
