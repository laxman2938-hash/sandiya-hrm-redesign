'use client';

import { useEffect, useState } from 'react';

type CandidateSubmission = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  passportUrl: string;
  experienceCertificateUrl: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
};

export default function CandidatesPage() {
  const [submissions, setSubmissions] = useState<CandidateSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<CandidateSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [notes, setNotes] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/candidates');
      const result = await response.json();
      if (result.success) {
        setSubmissions(result.data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url: string, filename: string, docType: 'passport' | 'experience') => {
    try {
      setDownloading(docType);
      
      // Fetch the file
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      
      // Get the blob
      const blob = await response.blob();
      
      // Determine file extension from URL or content type
      const urlParts = url.split('.');
      const urlExtension = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params
      const contentType = response.headers.get('content-type');
      
      let extension = 'pdf'; // Default
      if (contentType?.includes('pdf')) {
        extension = 'pdf';
      } else if (contentType?.includes('image') || ['jpg', 'jpeg', 'png', 'webp'].includes(urlExtension)) {
        extension = urlExtension || 'jpg';
      }
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${filename}_${docType}.${extension}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch('/api/candidates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, notes }),
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
        setNotes('');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`/api/candidates?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubmissions();
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSubmissions =
    statusFilter === 'all' ? submissions : submissions.filter((s) => s.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Candidate Submissions ({submissions.length})</h2>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Submissions</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {filteredSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Area</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {submission.firstName} {submission.lastName}
                      </p>
                      <p className="text-xs text-gray-600">{submission.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.areaOfInterest}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setNotes(submission.notes || '');
                        }}
                        className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Submissions</h3>
            <p className="text-gray-600">No candidate submissions found.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedSubmission.firstName} {selectedSubmission.lastName}
              </h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-600">Email</p>
                <p className="text-gray-900">{selectedSubmission.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Phone</p>
                <p className="text-gray-900">{selectedSubmission.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Area of Interest</p>
                <p className="text-gray-900">{selectedSubmission.areaOfInterest}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Submitted Date</p>
                <p className="text-gray-900">{new Date(selectedSubmission.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Documents</p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={selectedSubmission.passportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    📄 Passport
                  </a>
                  {selectedSubmission.experienceCertificateUrl && (
                    <a
                      href={selectedSubmission.experienceCertificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      🎓 Experience
                    </a>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add internal notes..."
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <select
                  value={selectedSubmission.status}
                  onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 font-semibold rounded hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
