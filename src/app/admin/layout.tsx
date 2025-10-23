import Link from "next/link";
import { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard | Sandiya HRM",
  description: "Manage your website content",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Gallery", href: "/admin/gallery", icon: "🖼️" },
    { name: "Team", href: "/admin/team", icon: "👥" },
    { name: "Employment Categories", href: "/admin/employment-categories", icon: "💼" },
    { name: "Legal Documents", href: "/admin/legal-documents", icon: "📄" },
    { name: "Achievements", href: "/admin/achievements", icon: "🏆" },
    { name: "Clients", href: "/admin/clients", icon: "🤝" },
    { name: "Demand Letters", href: "/admin/demand-letters", icon: "📋" },
    { name: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
    { name: "Contact Messages", href: "/admin/messages", icon: "💬" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sandiya HRM</p>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome to Admin Panel</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your website content from here</p>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
