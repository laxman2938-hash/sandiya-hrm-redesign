'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<number | null>(null);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Who We Are', href: '/who-we-are' },
    { label: 'Services', href: '#', submenu: [
      { label: 'Employment Categories', href: '/employment-categories' },
      { label: 'Our Process', href: '/our-process' },
    ]},
    { label: 'Company', href: '#', submenu: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Achievements', href: '/achievements' },
      { label: 'Quality & Compliance', href: '/quality-compliance' },
      { label: 'Policy', href: '/policy' },
    ]},
    { label: 'Resources', href: '#', submenu: [
      { label: 'Clients', href: '/clients' },
      { label: 'Active Demand Letter', href: '/active-demand-letter' },
      { label: 'Legal Documents', href: '/legal-documents' },
    ]},
  ];

  return (
    <nav className="bg-white/95 shadow-lg sticky top-0 z-40 backdrop-blur-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-blue-600/50 overflow-hidden bg-white">
              <Image 
                src="/sandhaya.png" 
                alt="Sandiya HR Logo" 
                width={48} 
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Sandiya HR</div>
              <div className="text-xs text-blue-600 font-semibold hidden md:block">Ethical Recruitment</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-1">
            {navItems.map((item, idx) => (
              <div key={`nav-item-${idx}`} className="group relative" style={{ animation: 'fade-in-down 0.5s ease-out forwards', animationDelay: `${idx * 0.05}s` }}>
                <Link
                  href={item.href}
                  className="px-4 py-2 text-slate-700 hover:text-blue-600 transition-all duration-300 font-semibold text-sm flex items-center gap-1 group-hover:text-blue-600 relative"
                >
                  {item.label}
                  {item.submenu && <span className="text-xs transform group-hover:rotate-180 transition-transform duration-300">▾</span>}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50 border border-blue-100 transform origin-top group-hover:scale-y-100 scale-y-0">
                    {item.submenu.map((subitem, subIdx) => (
                      <Link
                        key={`submenu-item-${idx}-${subIdx}`}
                        href={subitem.href}
                        className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 text-sm transform hover:translate-x-1"
                        style={{ animationDelay: `${subIdx * 0.05}s` }}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-block px-4 sm:px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group text-sm sm:text-base"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-slate-700 text-xl sm:text-2xl transform hover:scale-110 transition-transform duration-300 p-2 -mr-2"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 sm:pb-6 space-y-1 border-t border-slate-100 bg-slate-50" style={{ animation: 'fade-in-down 0.5s ease-out forwards' }}>
            {navItems.map((item, idx) => (
              <div key={`mobile-nav-item-${idx}`}>
                {item.submenu ? (
                  <button
                    onClick={() => setExpandedSubmenu(expandedSubmenu === idx ? null : idx)}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-300 font-semibold flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className={`transform transition-transform duration-300 ${expandedSubmenu === idx ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-700 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-300 font-semibold transform hover:translate-x-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.submenu && expandedSubmenu === idx && (
                  <div className="pl-3 sm:pl-4 space-y-1 bg-blue-50 rounded-lg my-1 py-2 border-l-2 border-blue-200" style={{ animation: 'fade-in-down 0.5s ease-out forwards' }}>
                    {item.submenu.map((subitem, subIdx) => (
                      <Link
                        key={`mobile-submenu-item-${idx}-${subIdx}`}
                        href={subitem.href}
                        className="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-600 hover:text-blue-600 hover:bg-white rounded transition-all duration-300 transform hover:translate-x-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2 px-3 sm:px-4 pt-3 sm:pt-4 border-t border-slate-200">
              <Link
                href="/contact"
                className="flex-1 px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </nav>
  );
}
