import './globals.css';
import type { Metadata } from 'next';

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
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold">Schoolgle</h1>
          </div>
        </header>
        
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {children}
          </div>
        </main>
        
        <footer className="bg-gray-100 border-t p-4 text-center text-gray-600">
          <div className="max-w-4xl mx-auto">
            &copy; {new Date().getFullYear()} Schoolgle App
          </div>
        </footer>
      </body>
    </html>
  );
}