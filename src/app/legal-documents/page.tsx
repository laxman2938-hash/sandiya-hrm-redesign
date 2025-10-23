'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { LegalDocument } from '@/types';
import Link from 'next/link';

export default function LegalDocumentsPage() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response: any = await api.getLegalDocuments();
        setDocuments(Array.isArray(response) ? response : response.data?.results || response.data || []);
      } catch (err) {
        setError('Error fetching legal documents. Please try again.');
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  if (loading) return <div className="text-center py-40 text-2xl">Loading...</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Legal Documents</h1>
          <p className="text-xl text-blue-100">
            Access our official documents and compliance certifications
          </p>
        </div>
      </section>

      {/* Documents Grid - Photo Only */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {error ? (
            <div className="text-center text-red-600 text-lg">{error}</div>
          ) : documents.length > 0 ? (
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-slate-900">Our Documentation</h2>
                <p className="text-xl text-slate-600">Access our official documents and certifications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
                  >
                    <div className="relative bg-slate-200 h-96 overflow-hidden">
                      {doc.image ? (
                        <img
                          src={doc.image}
                          alt={doc.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200">
                          <div className="text-6xl">📄</div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl md:text-7xl mb-4">📭</div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">No Legal Documents Available</h2>
              <p className="text-base md:text-lg text-slate-600">Legal documents will be displayed here when available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Document Detail Modal - Fullscreen */}
      {selectedDocument && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex flex-col backdrop-blur-sm"
          onClick={() => setSelectedDocument(null)}
        >
          {/* Close Button */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-60">
            <button
              onClick={() => setSelectedDocument(null)}
              className="text-white bg-black/50 hover:bg-black/80 rounded-full p-3 md:p-4 transition text-2xl md:text-3xl w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Fullscreen Document Display */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
            {selectedDocument.image ? (
              <img
                src={selectedDocument.image}
                alt={selectedDocument.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="text-center text-white">
                <div className="text-8xl mb-4">📄</div>
                {/* <p className="text-2xl font-semibold">{selectedDocument.title}</p> */}
              </div>
            )}
          </div>

          {/* Document Info Footer */}
          <div className="bg-linear-to-t from-black/80 to-transparent p-4 md:p-6 text-white text-center">
            {/* <h2 className="text-xl md:text-2xl font-bold">{selectedDocument.title}</h2> */}
            <p className="text-sm md:text-base text-gray-300 mt-2">Legal Document</p>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 px-4 bg-linear-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Need More Information?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Contact us for any specific documents or inquiries
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-900 px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
