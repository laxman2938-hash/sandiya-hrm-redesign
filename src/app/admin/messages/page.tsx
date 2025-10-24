'use client';

import { useEffect, useState } from 'react';

type ContactMessageModel = {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string | Date;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessageModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      
      if (response.ok) {
        fetchMessages(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchMessages(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading messages...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Contact Messages ({messages.length})
        </h2>

        {messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">From</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Subject</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg: ContactMessageModel) => (
                  <tr
                    key={msg.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{msg.name}</p>
                      <p className="text-xs text-gray-600">{msg.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{msg.email}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{msg.subject}</p>
                      <p className="text-xs text-gray-600 truncate max-w-xs">{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        defaultValue={msg.status}
                        onChange={(e) => handleStatusChange(msg.id, e.target.value)}
                        className={`px-3 py-1 text-xs font-semibold rounded ${getStatusColor(
                          msg.status
                        )} border-0 cursor-pointer`}
                      >
                        <option value="pending">Pending</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(msg.id)}
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
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages Yet</h3>
            <p className="text-gray-600 mb-4">
              Contact messages from your website will appear here when visitors reach out to you.
            </p>
            <div className="text-sm text-gray-500">
              💡 Tip: Make sure your contact form is working properly to receive inquiries.
            </div>
          </div>
        )}
      </div>

      {/* Message Details Modal-like View */}
      {messages.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Latest Message</h3>
          {messages[0] && (
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600">From</p>
                  <p className="text-lg font-medium text-gray-900">{messages[0].name}</p>
                  <p className="text-sm text-gray-600">{messages[0].email}</p>
                  <p className="text-sm text-gray-600">Phone: {messages[0].phone}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Subject</p>
                  <p className="text-base font-medium text-gray-900">{messages[0].subject}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Message</p>
                  <p className="text-base text-gray-800 whitespace-pre-wrap">{messages[0].message}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(messages[0].createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
