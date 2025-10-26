'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// This would normally be in a separate metadata file, but for dynamic pages we export it here
// Note: This is a client component, so metadata won't be used. Use generateMetadata in parent layout instead.

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const sliderImages = [
    {
      title: 'Connecting Global Talent',
      subtitle: 'Empower your career journey with ethical recruitment practices',
      color: 'from-slate-900 via-blue-900 to-blue-800',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    },
    {
      title: 'Zero-Cost Recruitment',
      subtitle: 'Fair opportunities for all, without financial barriers',
      color: 'from-blue-900 via-indigo-900 to-purple-800',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    },
    {
      title: 'Your Dream Job Awaits',
      subtitle: 'Trusted by thousands of professionals worldwide',
      color: 'from-indigo-900 via-purple-900 to-blue-800',
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: '10K+', label: 'Successful Placements', icon: '✅' },
    { number: '10+', label: 'Years Experience', icon: '⭐' },
    { number: '500+', label: 'Partner Companies', icon: '🏢' },
    { number: '50+', label: 'Countries', icon: '🌍' },
  ];

  const features = [
    {
      icon: '🔒',
      title: 'Zero Cost Policy',
      description: 'We strictly follow a zero-cost recruitment policy to eliminate financial burdens on candidates',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '📋',
      title: 'Responsible Recruitment Policy',
      description: 'We promote responsible recruitment policies that support well-being and growth worldwide',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '💬',
      title: 'Third-party Helpline & Email Support',
      description: 'Continuous assistance for ethical concerns with quick, confidential, and effective resolutions',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Slider Section - Ultra Modern with Image */}
      <section className="relative w-full min-h-screen">
        {sliderImages.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 w-full h-full ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Mobile: Background Image with Content Overlay - Inspired by Nexgenovate Design */}
            <div 
              className="md:hidden absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.85) 0%, rgba(55, 65, 181, 0.80) 100%), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
              }}
            >
              {/* Mobile Content - Clean Nexgenovate-style layout */}
              <div className="relative z-10 h-full w-full px-4 sm:px-5 py-10 sm:py-14 flex flex-col justify-center items-center text-center space-y-5 sm:space-y-6">
                {/* Tagline */}
                <span className="inline-block bg-blue-400/20 border border-blue-300/40 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-blue-50 w-fit mx-auto">
                  ✨ {idx === 0 ? 'Ethical Recruitment' : idx === 1 ? 'Zero Cost Policy' : 'Global Opportunities'}
                </span>

                {/* Main Heading - Bold and Clear */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white drop-shadow-lg max-w-sm">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-blue-50 drop-shadow-md max-w-sm leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons - Improved spacing and sizing */}
                <div className="flex flex-col gap-3 w-full max-w-xs pt-2 sm:pt-3">
                  <Link
                    href="/gallery"
                    className="bg-white text-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-blue-50 transition duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base w-full text-center shadow-lg hover:shadow-xl"
                  >
                    View Our Work →
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition duration-300 text-sm sm:text-base w-full text-center shadow-lg hover:shadow-xl"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop: Gradient Background with Side-by-side Layout - Nexgenovate Inspired */}
            <div 
              className="hidden md:block absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `linear-gradient(135deg, #1e3a8a 0%, #3741b5 50%, #1e1b4b 100%), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right',
                backgroundAttachment: 'fixed',
              }}
            >
              {/* Desktop Content - Clean Nexgenovate-Inspired Layout */}
              <div className="relative z-10 h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 lg:px-14 xl:px-20 py-24 lg:py-28 items-center">
                {/* Left side: Text content - Bold and Clear */}
                <div className="flex flex-col justify-center items-start text-left space-y-7">
                  {/* Badge/Tag */}
                  <div className="inline-block">
                    <span className="bg-blue-400/25 border border-blue-300/50 rounded-full px-5 py-2 text-sm font-semibold text-blue-100 flex items-center gap-2 backdrop-blur-sm">
                      ✨ {idx === 0 ? 'Ethical Recruitment' : idx === 1 ? 'Zero Cost Policy' : 'Global Opportunities'}
                    </span>
                  </div>

                  {/* Main Heading - Large and Bold */}
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white drop-shadow-lg">
                    {slide.title}
                  </h1>

                  {/* Subtitle/Description */}
                  <p className="text-lg lg:text-xl text-blue-50 drop-shadow-md max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* CTA Buttons - Prominent and Spacious */}
                  <div className="flex gap-5 pt-6 items-center">
                    <Link
                      href="/gallery"
                      className="bg-white text-blue-900 px-10 py-3.5 rounded-lg font-bold hover:bg-blue-50 transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-base flex items-center gap-2"
                    >
                      View Our Work →
                    </Link>
                    <Link
                      href="/contact"
                      className="border-2 border-white text-white px-10 py-3.5 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition duration-300 shadow-lg hover:shadow-xl text-base"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>

                {/* Right side: Image - Professional Display */}
                <div className="flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-96 lg:h-full object-cover rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Navigation Dots - Hidden on Mobile */}
        <div className="hidden md:flex absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20 gap-2 md:gap-3">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all ${
                idx === currentSlide ? 'bg-white w-6 md:w-7 h-2.5 md:h-3' : 'bg-white/50 hover:bg-white/75 w-2.5 h-2.5 md:w-3 md:h-3'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slider Navigation Arrows - Hidden on Mobile */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
          className="hidden md:block absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-1.5 md:p-3 rounded-full transition text-lg md:text-xl"
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
          className="hidden md:block absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-1.5 md:p-3 rounded-full transition text-lg md:text-xl"
          aria-label="Next slide"
        >
          →
        </button>
      </section>

      {/* Stats Section - Separate Below Hero */}
      <section className="py-8 md:py-16 px-4 bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center transform hover:scale-110 transition group p-4 md:p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 backdrop-blur-sm">
                <div className="text-2xl md:text-4xl mb-2 transform group-hover:scale-125 transition">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">{stat.number}</div>
                <div className="text-xs md:text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section - Premium Design */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left - Image Section */}
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '0s' }}>
              <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative h-96 md:h-full md:min-h-96 rounded-3xl overflow-hidden border-2 border-blue-100 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop"
                  alt="Our Story"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Right - Content Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="inline-block text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">Our Story</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900 leading-tight">
                Nepal's Leading Ethical Recruitment Partner
              </h2>
              <p className="text-base md:text-lg text-slate-700 mb-4 md:mb-6 leading-relaxed">
                Sandiya Human Resources Pvt. Ltd. is a trusted recruitment agency committed to connecting the right talent with the right opportunities across the globe. We follow a zero-cost recruitment policy to ensure candidates can seamlessly step into the global workforce without financial burden.
              </p>
              <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed">
                Our mission is to empower individuals to reach their full potential while delivering exceptional value and results to the organizations they serve. With over 10 years of experience, we've successfully placed 10,000+ professionals worldwide.
              </p>
              
              {/* Stats in Story Section */}
              <div className="grid grid-cols-3 gap-4 mb-8 md:mb-10">
                {[
                  { number: '10+', label: 'Years' },
                  { number: '10K+', label: 'Placements' },
                  { number: '50+', label: 'Countries' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition group/stat">
                    <p className="text-2xl md:text-3xl font-bold text-blue-600 group-hover/stat:text-blue-700">{stat.number}</p>
                    <p className="text-xs md:text-sm text-slate-600 group-hover/stat:text-slate-700">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span>Read Our Full Story</span>
                <span className="transform group-hover:translate-x-2 transition">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Advanced Grid */}
      <section className="py-12 md:py-24 px-4 bg-linear-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">Our Advantages</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-slate-900">
              Why Choose Sandiya HR?
            </h2>
            <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto px-2">
              We're committed to ethical recruitment practices and candidate success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative h-full"
                style={{ animation: `slideInUp 0.6s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-slate-100 to-slate-50 rounded-2xl group-hover:opacity-0 transition duration-300"></div>
                <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300`}></div>
                
                <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl border border-slate-200 group-hover:border-transparent transition h-full flex flex-col">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 transform group-hover:scale-125 transition">{feature.icon}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 text-slate-900 group-hover:text-white transition">{feature.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 group-hover:text-white/90 transition grow">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours Section - Premium Design */}
      <section className="py-12 md:py-24 px-4 bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0s' }}>
              <span className="inline-block text-blue-300 font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">Our Availability</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight">
                Working Hours
              </h2>
              <p className="text-base md:text-lg text-blue-100 mb-8 md:mb-10 leading-relaxed">
                Our dedicated team is here to assist you with recruitment services, inquiries, and support during our working hours. We're committed to providing prompt, professional, and ethical guidance throughout your recruitment journey.
              </p>

              <div className="space-y-4 md:space-y-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group">
                  <p className="text-sm md:text-base font-semibold text-blue-300 mb-2 uppercase tracking-wide">Sunday to Friday</p>
                  <p className="text-2xl md:text-4xl font-bold text-white">10:00 AM - 06:00 PM</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition group">
                  <p className="text-sm md:text-base font-semibold text-blue-300 mb-2 uppercase tracking-wide">Saturday</p>
                  <p className="text-2xl md:text-4xl font-bold text-white">Closed</p>
                </div>
             
              </div>

              <Link
                href="/contact"
                className="inline-block mt-8 md:mt-10 px-8 md:px-10 py-3 md:py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition transform hover:scale-105 hover:shadow-2xl"
              >
                Contact Us Now
              </Link>
            </div>

            {/* Right - Contact Cards */}
            <div className="grid grid-cols-1 gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/15 transition transform hover:scale-105 hover:-translate-y-2 group">
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-125 transition shrink-0">📞</div>
                <p className="text-sm text-blue-300 uppercase font-semibold mb-2">Call Us</p>
                <p className="text-lg md:text-2xl font-bold text-white mb-1">+977 014374161</p>
                <p className="text-lg md:text-2xl font-bold text-white mb-1">+977 9843391036</p>
                <p className="text-lg md:text-2xl font-bold text-white mb-2">+977 9801255090</p>
                <p className="text-sm text-blue-100">Available during working hours</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/15 transition transform hover:scale-105 hover:-translate-y-2 group">
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-125 transition">✉️</div>
                <p className="text-sm text-blue-300 uppercase font-semibold mb-2">Email Us</p>
                <p className="text-lg md:text-2xl font-bold text-white mb-2 break-all">info@sandiyahr.com.np</p>
                <p className="text-sm text-blue-100">We'll respond within 24 hours</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 hover:bg-white/15 transition transform hover:scale-105 hover:-translate-y-2 group">
                <div className="text-4xl md:text-5xl mb-4 transform group-hover:scale-125 transition">📍</div>
                <p className="text-sm text-blue-300 uppercase font-semibold mb-2">Visit Us</p>
                <p className="text-lg md:text-2xl font-bold text-white mb-2">Dhumbarahi, Kathmandu</p>
                <p className="text-sm text-blue-100">Nepal</p>
              </div>
            </div>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
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
