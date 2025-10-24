// Force dynamic rendering for admin dashboard
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Pages</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">10</p>
            </div>
            <span className="text-4xl">📊</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Content Items</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">48</p>
            </div>
            <span className="text-4xl">📝</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <span className="text-4xl">💬</span>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-900">Quick Links:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><a href="/admin/gallery" className="text-blue-600 hover:underline">Add Gallery Images</a></li>
              <li><a href="/admin/team" className="text-blue-600 hover:underline">Add Team Members</a></li>
              <li><a href="/admin/demand-letters" className="text-blue-600 hover:underline">Add Demand Letters</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Recent Activity:</p>
            <p className="mt-2 text-gray-600">All systems operational. Ready to manage content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
