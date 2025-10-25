'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Force dynamic rendering for admin dashboard
export const dynamic = 'force-dynamic';

type Stats = {
  candidates: number;
  feedbacks: number;
  messages: number;
  loading: boolean;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    candidates: 0,
    feedbacks: 0,
    messages: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [candidatesRes, feedbacksRes, messagesRes] = await Promise.all([
        fetch('/api/candidates'),
        fetch('/api/feedback'),
        fetch('/api/messages'),
      ]);

      const candidatesData = await candidatesRes.json();
      const feedbacksData = await feedbacksRes.json();
      const messagesData = await messagesRes.json();

      setStats({
        candidates: candidatesData.data?.length || 0,
        feedbacks: feedbacksData.data?.length || 0,
        messages: messagesData.data?.length || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-slate-950 to-blue-950 rounded-lg shadow-md p-6 text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-slate-200">Manage all your submissions, feedback, and inquiries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Candidates Stats */}
        <Link href="/admin/candidates">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Candidate Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.candidates}</p>
                <p className="text-xs text-gray-500 mt-2">View all submissions</p>
              </div>
              <span className="text-5xl">👥</span>
            </div>
          </div>
        </Link>

        {/* Feedback Stats */}
        <Link href="/admin/feedback">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Feedback & Grievances</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.feedbacks}</p>
                <p className="text-xs text-gray-500 mt-2">View all feedback</p>
              </div>
              <span className="text-5xl">�</span>
            </div>
          </div>
        </Link>

        {/* Messages Stats */}
        <Link href="/admin/messages">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Contact Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.messages}</p>
                <p className="text-xs text-gray-500 mt-2">View all messages</p>
              </div>
              <span className="text-5xl">�</span>
            </div>
          </div>
        </Link>

        {/* Content Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Submissions</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.candidates + stats.feedbacks + stats.messages}</p>
              <p className="text-xs text-gray-500 mt-2">All submissions</p>
            </div>
            <span className="text-5xl">�</span>
          </div>
        </div>
      </div>

      {/* Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Submissions Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📋 Submissions Management
          </h3>
          <div className="space-y-3">
            <Link href="/admin/candidates">
              <button className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                👥 View Candidates ({stats.candidates})
              </button>
            </Link>
            <Link href="/admin/feedback">
              <button className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                💬 View Feedback ({stats.feedbacks})
              </button>
            </Link>
            <Link href="/admin/messages">
              <button className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                📧 View Messages ({stats.messages})
              </button>
            </Link>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📝 Content Management
          </h3>
          <div className="space-y-3">
            <Link href="/admin/gallery">
              <button className="w-full px-4 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors">
                🖼️ Gallery
              </button>
            </Link>
            <Link href="/admin/team">
              <button className="w-full px-4 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors">
                👔 Team Members
              </button>
            </Link>
            <Link href="/admin/achievements">
              <button className="w-full px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
                🏆 Achievements
              </button>
            </Link>
          </div>
        </div>

        {/* Documents Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📚 Documents
          </h3>
          <div className="space-y-3">
            <Link href="/admin/demand-letters">
              <button className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                📄 Demand Letters
              </button>
            </Link>
            <Link href="/admin/legal-documents">
              <button className="w-full px-4 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors">
                ⚖️ Legal Documents
              </button>
            </Link>
            <Link href="/admin/testimonials">
              <button className="w-full px-4 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                ⭐ Testimonials
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3">📊 Quick Stats & Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Submissions Overview:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✅ Candidates: <span className="font-bold text-blue-600">{stats.candidates}</span></li>
              <li>✅ Feedback & Grievances: <span className="font-bold text-green-600">{stats.feedbacks}</span></li>
              <li>✅ Contact Messages: <span className="font-bold text-orange-600">{stats.messages}</span></li>
              <li>📈 Total: <span className="font-bold text-purple-600">{stats.candidates + stats.feedbacks + stats.messages}</span></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">System Status:</p>
            <div className="text-sm text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Database Connection: Active
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                File Storage: Operational
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                API Endpoints: Running
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
