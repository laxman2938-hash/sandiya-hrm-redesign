'use client';

import { useEffect, useState } from 'react';

type Feedback = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  feedbackType: string;
  subject: string;
  message: string;
  category: string | null;
  isAnonymous: boolean;
  priority: string;
  status: string;
  resolution: string | null;
  createdAt: string;
};

export default function FeedbackAdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [resolution, setResolution] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback');
      const result = await response.json();
      if (result.success) {
        setFeedbacks(result.data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, resolution }),
      });

      if (response.ok) {
        fetchFeedbacks();
        setSelectedFeedback(null);
        setResolution('');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    try {
      const response = await fetch(`/api/feedback?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchFeedbacks();
        setSelectedFeedback(null);
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'feedback':
        return '💬';
      case 'grievance':
        return '⚠️';
      case 'complaint':
        return '🚨';
      case 'suggestion':
        return '💡';
      default:
        return '📝';
    }
  };

  const filteredFeedbacks = feedbacks.filter((f) => {
    const statusMatch = statusFilter === 'all' || f.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || f.priority === priorityFilter;
    const typeMatch = typeFilter === 'all' || f.feedbackType === typeFilter;
    return statusMatch && priorityMatch && typeMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading feedbacks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Feedback & Grievance Portal</h2>
            <p className="text-gray-600 mt-1">Total submissions: {feedbacks.length}</p>
          </div>

          <div className="inline-block bg-gradient-to-r from-red-100 to-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-sm font-semibold text-red-800">
              🚨 Urgent: {feedbacks.filter((f) => f.priority === 'urgent').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="feedback">Feedback</option>
            <option value="grievance">Grievance</option>
            <option value="complaint">Complaint</option>
            <option value="suggestion">Suggestion</option>
          </select>
        </div>

        {/* Feedbacks Table */}
        {filteredFeedbacks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Type & Priority</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">From</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getFeedbackTypeIcon(feedback.feedbackType)}</span>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">{feedback.feedbackType}</p>
                          <span className={`inline-block text-xs font-semibold px-2 py-1 rounded border ${getPriorityColor(feedback.priority)}`}>
                            {feedback.priority}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{feedback.name}</p>
                      <p className="text-xs text-gray-600">{feedback.email}</p>
                      {feedback.isAnonymous && <p className="text-xs text-amber-600 font-semibold">Anonymous</p>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 truncate max-w-xs">{feedback.subject}</p>
                      {feedback.category && <p className="text-xs text-gray-600">{feedback.category}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                        {feedback.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setResolution(feedback.resolution || '');
                        }}
                        className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition"
                      >
                        View & Reply
                      </button>
                      <button
                        onClick={() => handleDelete(feedback.id)}
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
            <div className="text-6xl mb-4">📬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Feedbacks Found</h3>
            <p className="text-gray-600">No feedback submissions matching your filters.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-2xl my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{getFeedbackTypeIcon(selectedFeedback.feedbackType)}</span>
                  <h3 className="text-2xl font-bold text-gray-900 capitalize">{selectedFeedback.feedbackType}</h3>
                </div>
                <span className={`inline-block text-xs font-semibold px-2 py-1 rounded border ${getPriorityColor(selectedFeedback.priority)}`}>
                  {selectedFeedback.priority}
                </span>
              </div>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <div>
                <p className="text-sm font-semibold text-gray-600">Subject</p>
                <p className="text-gray-900 font-bold">{selectedFeedback.subject}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">From</p>
                <p className="text-gray-900">{selectedFeedback.name} {selectedFeedback.isAnonymous && '(Anonymous)'}</p>
                <p className="text-sm text-gray-600">{selectedFeedback.email}</p>
                {selectedFeedback.phone && <p className="text-sm text-gray-600">{selectedFeedback.phone}</p>}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Category</p>
                <p className="text-gray-900">{selectedFeedback.category || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Message</p>
                <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200 text-justify">
                  {selectedFeedback.message}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Submitted</p>
                <p className="text-gray-900">{new Date(selectedFeedback.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Resolution / Response</label>
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Add your response or resolution..."
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <select
                  value={selectedFeedback.status}
                  onChange={(e) => handleStatusChange(selectedFeedback.id, e.target.value)}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="open">Open</option>
                  <option value="under_review">Under Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedFeedback(null)}
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
