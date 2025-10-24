import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard | Sandiya HRM",
  description: "Manage your website content",
};

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Check authentication
  const user = await getSession();
  
  if (!user) {
    redirect('/login');
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Gallery", href: "/admin/gallery" },
    { name: "Team", href: "/admin/team" },
    { name: "Legal Documents", href: "/admin/legal-documents" },
    { name: "Achievements", href: "/admin/achievements" },
    { name: "Clients", href: "/admin/clients" },
    { name: "Demand Letters", href: "/admin/demand-letters" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "Contact Messages", href: "/admin/messages" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <Image
            src="/sandhaya.png"
            alt="Sandiya HRM Logo"
            width={60}
            height={60}
            className="mb-3"
          />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sandiya HRM</p>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium text-white hover:text-white"
                >
                  <span className="w-5 h-5">
                    <Image
                      src="/sandhaya.png"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

       
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome to Admin Panel</h2>
            <p className="text-gray-600 text-sm mt-1">
              Logged in as: <span className="font-medium text-blue-600">{user.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="/sandhaya.png"
              alt="Sandiya HRM"
              width={50}
              height={50}
              className="object-contain"
            />
            <LogoutButton />
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
