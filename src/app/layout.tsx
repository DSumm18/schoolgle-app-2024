import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

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
          <header className="bg-blue-600 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Schoolgle</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="/" className="hover:underline">Home</a>
                  </li>
                  <li>
                    <a href="/login" className="hover:underline">Login</a>
                  </li>
                  <li>
                    <a href="/register" className="hover:underline">Register</a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          
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