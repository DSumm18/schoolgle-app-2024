import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Schoolgle - AI-Powered Tools for Educators',
  description: 'Schoolgle helps teachers save time, reduce stress, and focus on what matters most—their students and their wellbeing.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 dark:text-white`}>
        <Providers>
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <footer className="px-4 py-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Schoolgle</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    AI-powered tools designed for educators to enhance teaching and support wellbeing.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="#teachers-hub" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Teachers Hub
                      </a>
                    </li>
                    <li>
                      <a href="#school-business-manager" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        School Business Manager
                      </a>
                    </li>
                    <li>
                      <a href="#governance" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Governance
                      </a>
                    </li>
                    <li>
                      <a href="#report-buddy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Report Buddy
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Company</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="/careers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="/press" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Press
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Legal</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="/data" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Data Processing
                      </a>
                    </li>
                    <li>
                      <a href="/cookies" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Cookie Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Schoolgle. All rights reserved.
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}