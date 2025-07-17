import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LMS Admin Dashboard – Manage Courses, Users & Content',
  description: 'Powerful admin panel to manage your Learning Management System (LMS). Built with Next.js, Clerk, and modern frontend tools.',
  keywords: [
    'LMS admin panel',
    'learning management system admin',
    'admin dashboard',
    'course management',
    'user management',
    'Next.js LMS',
    'Clerk authentication',
  ],
  authors: [{ name: 'Mozammil Raja', url: 'https://github.com/mozammilrja' }],
  openGraph: {
    title: 'LMS Admin Panel',
    description: 'Admin dashboard to manage courses, users, and analytics in your LMS.',
    url: 'https://yourdomain.com/admin', // 🔁 Replace with your actual admin route
    siteName: 'LMS Admin Dashboard',
    images: [
      {
        url: 'https://yourdomain.com/admin-og.png', // 🔁 Add your own OG image
        width: 1200,
        height: 630,
        alt: 'LMS Admin Panel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL('https://yourdomain.com'), // 🔁 Replace with your real domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
