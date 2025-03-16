import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Schoolgle App',
  description: 'A comprehensive school management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          
          <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
              {children}
            </div>
          </main>
          
          <footer className="bg-gray-100 border-t p-4 text-center text-gray-600">
            <div className="max-w-6xl mx-auto">
              &copy; {new Date().getFullYear()} Schoolgle App
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}