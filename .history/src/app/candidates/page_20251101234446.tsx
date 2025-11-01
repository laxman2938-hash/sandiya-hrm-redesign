'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatesPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areaOfInterest: '',
  });

  const [files, setFiles] = useState({
    passport: null as File | null,
    experience: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const areasOfInterest = [
    'Cleaner',
    'Security Guard',
    'Nurse',
    'Construction Worker',
    'Chef',
    'Driver',
    'Domestic Helper',
    'Electrician',
    'Plumber',
    'Carpenter',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: fileList[0],
      }));
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
      // Create FormData for the API route
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'candidates');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary upload error:', errorData);
        throw new Error(`Upload failed: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.url) {
        console.log('✅ File uploaded to Cloudinary:', data.url);
        return data.url;
      }
      throw new Error('Upload failed: No URL in response');
    } catch (error) {
      console.error('❌ File upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.passport) {
      setMessage({ type: 'error', text: 'Passport is required' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Upload files to Cloudinary
      const passportUrl = await uploadToCloudinary(files.passport);
      let experienceCertificateUrl = '';

      if (files.experience) {
        experienceCertificateUrl = await uploadToCloudinary(files.experience);
      }

      // Submit form with file URLs
      const submitData = new FormData();
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('areaOfInterest', formData.areaOfInterest);
      submitData.append('passportUrl', passportUrl);
      if (experienceCertificateUrl) {
        submitData.append('experienceCertificateUrl', experienceCertificateUrl);
      }

      const response = await fetch('/api/candidates', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Application submitted successfully! We will review it and contact you soon.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          areaOfInterest: '',
        });
        setFiles({ passport: null, experience: null });
      } else {
        setMessage({ type: 'error', text: result.message || 'Error submitting application' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error submitting application. Please try again.';
      setMessage({ type: 'error', text: `❌ ${errorMessage}` });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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
              🚀 Apply Now
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">Join Our Global Network</h1>
            <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">Submit your application and documents to explore exciting career opportunities worldwide</p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
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
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                    placeholder="+977 XXXXXXXXXX"
                  />
                </div>
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Area of Interest *</label>
                <select
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-sm"
                >
                  <option value="">Select your area of interest</option>
                  {areasOfInterest.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {/* Passport Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Passport (PDF/Image) *</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer group">
                  <input
                    type="file"
                    name="passport"
                    onChange={handleFileChange}
                    required
                    accept=".pdf,.jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <div className="text-3xl mb-2">📄</div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                      {files.passport ? files.passport.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Experience Certificate Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-slate-900 uppercase tracking-wide">Experience Certificate (Optional)</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-blue-500 transition cursor-pointer group">
                  <input
                    type="file"
                    name="experience"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">
                      {files.experience ? files.experience.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {loading ? 'Uploading & Submitting...' : 'Submit Application'}
              </button>

              <p className="text-xs text-center text-slate-600">
                By submitting this form, you agree to our terms and conditions and consent to being contacted about your application.
              </p>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-8 md:mt-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-3">📋 What to Upload:</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✓ Scanned copy of your passport (clear photos of all pages)</li>
              <li>✓ Experience certificates or work letters (if available)</li>
              <li>✓ Any relevant certifications or qualifications</li>
              <li>✓ Make sure documents are clear and readable</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-24 px-4 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Why Apply With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: '💰',
                title: 'Zero Cost Policy',
                description: 'We never charge candidates for recruitment services or placement',
              },
              {
                icon: '🌍',
                title: 'Global Opportunities',
                description: 'Access to job opportunities across 50+ countries',
              },
              {
                icon: '⚡',
                title: 'Fast Processing',
                description: 'Your application is reviewed within 24-48 hours',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-xl border border-blue-100 hover:shadow-lg transition text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
