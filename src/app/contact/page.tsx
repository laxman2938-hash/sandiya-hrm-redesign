'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { ContactMessage } from '@/types';

export default function ContactPage() {
  const [formData, setFormData] = useState<Omit<ContactMessage, 'id'>>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.submitContactForm(formData);
      setMessage({ type: 'success', text: 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error sending message. Please try again.' });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-blue-100">
              📞 Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">Get in Touch</h1>
            <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2 text-justify">We're here to help and answer any question you might have. Reach out to us anytime!</p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="group bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100 text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition">📞</div>
              <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">Call Us</h3>
              <p className="text-slate-600 text-base sm:text-lg font-semibold mb-1">+977 014374161</p>
              <p className="text-slate-600 text-base sm:text-lg font-semibold mb-1">+977 9843391036</p>
              <p className="text-slate-600 text-base sm:text-lg font-semibold mb-3">+977 9801255090</p>
              <p className="text-slate-500 text-xs sm:text-sm">Sun - Fri 10:00 AM - 6:00 PM</p>
            </div>

            <div className="group bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100 text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition">✉️</div>
              <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">Email Us</h3>
              <p className="text-slate-600 text-base sm:text-lg font-semibold mb-1 break-all">info@sandiyahr.com.np</p>
              <p className="text-slate-500 text-xs sm:text-sm">We'll respond within 24 hours</p>
            </div>

            <div className="group bg-gradient-to-br from-slate-50 to-blue-50 p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100 text-center hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition">📍</div>
              <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">Visit Us</h3>
              <p className="text-slate-600 text-base sm:text-lg font-semibold mb-1">Dhumbarahi, Kathmandu</p>
              <p className="text-slate-500 text-xs sm:text-sm">Nepal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-slate-900">Find Us on the Map</h2>
            <p className="text-sm sm:text-base md:text-xl text-slate-600 px-2 text-justify">Visit our office location in Dhumbarahi, Kathmandu</p>
          </div>
          
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl border border-blue-100 mb-8 sm:mb-10 md:mb-12">
            <iframe
              width="100%"
              height="400"
              frameBorder={0}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9687739227923!2d85.32477!3d27.708333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198f5c8b6c8d%3A0x123456789abcdef0!2sDhumbarahi%2C%20Kathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1629862800000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100 shadow-md md:shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Office Hours</h3>
              <ul className="space-y-2 sm:space-y-3 text-slate-700 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span><strong>Sunday - Friday:</strong> 10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span><strong>Saturday:</strong> Closed</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-blue-100 shadow-md md:shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3 text-slate-700 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <a href="tel:+977014374161" className="hover:text-blue-600 transition break-all">📞 +977 014374161</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <a href="tel:+9779843391036" className="hover:text-blue-600 transition break-all">📞 +977 9843391036</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <a href="tel:+9779801255090" className="hover:text-blue-600 transition break-all">📞 +977 9801255090</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold shrink-0">•</span>
                  <a href="https://wa.me/9779843391036" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition break-all flex items-center gap-2">
                    <span>🟢 WhatsApp: +977 9843391036</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold shrink-0">•</span>
                  <a href="https://wa.me/9779801255090" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition break-all flex items-center gap-2">
                    <span>🟢 WhatsApp: +977 9801255090</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <a href="mailto:info@sandiyahr.com.np" className="hover:text-blue-600 transition break-all">info@sandiyahr.com.np</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span>Dhumbarahi, Kathmandu</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <span className="inline-block text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">Contact Form</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-slate-900">Send us a Message</h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 px-2 text-justify">Fill out the form below and we'll get back to you as soon as possible</p>
          </div>

          {message && (
            <div
              className={`p-6 rounded-2xl mb-8 text-lg font-semibold animate-pulse ${
                message.type === 'success'
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300'
                  : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-300'
              }`}
            >
              {message.type === 'success' ? '✓ ' : '✗ '}{message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-blue-50 p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-lg md:shadow-xl border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                  placeholder="+977 XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                  placeholder="How can we help?"
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
