'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    feedbackType: 'feedback',
    subject: '',
    message: '',
    category: '',
    isAnonymous: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Thank you! Your feedback has been submitted successfully. We will review it and respond soon.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          feedbackType: 'feedback',
          subject: '',
          message: '',
          category: '',
          isAnonymous: false,
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Error submitting feedback' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error submitting feedback. Please try again.' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const feedbackTypes = [
    { value: 'feedback', label: '💬 General Feedback' },
    { value: 'grievance', label: '⚠️ Grievance' },
    { value: 'complaint', label: '🚨 Complaint' },
    { value: 'suggestion', label: '💡 Suggestion' },
  ];

  const categories = [
    'Recruitment Process',
    'Placement & Job',
    'Payment & Benefits',
    'Workplace Issues',
    'Safety & Harassment',
    'Communication',
    'Other',
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-950 via-indigo-950 to-slate-950 text-white py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-blue-100">
              📢 Your Voice Matters
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">Feedback & Grievance Portal</h1>
            <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
              We value your input. Share your feedback, report concerns, or file grievances confidentially.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-24 px-4 bg-linear-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Info Cards */}
            {[
              {
                icon: '🔒',
                title: 'Confidential',
                description: 'Your information is kept secure and confidential. Anonymous submissions supported.',
              },
              {
                icon: '⚡',
                title: 'Fast Response',
                description: 'We respond to all submissions within 48 hours. Urgent cases receive priority.',
              },
              {
                icon: '✓',
                title: 'Zero Retaliation',
                description: 'We have zero tolerance for retaliation. All concerns are handled fairly and professionally.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Feedback Form */}
          <div className="bg-linear-to-br from-white to-blue-50 p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg md:shadow-xl border border-blue-200">
            {message && (
              <div
                className={`p-6 rounded-2xl mb-8 text-lg font-semibold animate-pulse ${
                  message.type === 'success'
                    ? 'bg-linear-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300'
                    : 'bg-linear-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-300'
                }`}
              >
                {message.type === 'success' ? '✓ ' : '✗ '}{message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Feedback Type */}
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Feedback Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {feedbackTypes.map((type) => (
                    <label key={type.value} className="flex items-center gap-2 p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-blue-600 transition" style={{borderColor: formData.feedbackType === type.value ? '#2563eb' : '#e2e8f0'}}>
                      <input
                        type="radio"
                        name="feedbackType"
                        value={type.value}
                        checked={formData.feedbackType === type.value}
                        onChange={handleInputChange}
                        className="cursor-pointer"
                      />
                      <span className="text-sm font-medium text-slate-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!formData.isAnonymous}
                    disabled={formData.isAnonymous}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm disabled:bg-gray-100"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={!formData.isAnonymous}
                    disabled={formData.isAnonymous}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm disabled:bg-gray-100"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                    placeholder="+977 XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Category (Optional)</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                  placeholder="Brief subject of your feedback"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm resize-none"
                  placeholder="Please provide detailed information about your feedback, grievance, or complaint..."
                />
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <label className="flex-1 cursor-pointer">
                  <p className="font-semibold text-slate-900">Submit Anonymously</p>
                  <p className="text-xs text-slate-600">Your name and email will not be shared (we recommend providing contact info for follow-up)</p>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>

              <p className="text-xs text-center text-slate-600">
                All submissions are reviewed within 48 hours. We take all feedback seriously and are committed to continuous improvement.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-12 md:py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Need Immediate Assistance?</h2>
            <p className="text-slate-600 mt-2">Contact us directly through any of these channels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '📞', title: 'Call Us', contact: '+977 014374161', desc: 'Sun-Fri, 10 AM - 6 PM' },
              { icon: '📧', title: 'Email Us', contact: 'sandiyahr17@gmail.com', desc: 'Response within 24 hours' },
              { icon: '💬', title: 'WhatsApp', contact: '+977 9841XXXXXX', desc: 'Quick response' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-md text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-blue-600 font-semibold mb-2">{item.contact}</p>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
