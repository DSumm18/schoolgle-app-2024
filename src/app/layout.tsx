import './globals.css';
import { Inter } from 'next/font/google';
import { EnhancedNavbar } from '@/components/EnhancedNavbar';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import AuthProvider from '@/components/AuthProvider';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Schoolgle - AI Tools for Education',
  description: 'Our platform provides intelligent tools designed specifically for educators to enhance teaching and support wellbeing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <EnhancedNavbar logo={<AnimatedLogo />} />
            <main className="flex-grow">{children}</main>
            
            <footer className="bg-gray-100 dark:bg-gray-800 py-12">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="mb-4 text-2xl font-bold">
                      <AnimatedLogo />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      AI-powered tools designed for education professionals to enhance teaching and improve operational efficiency.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <ul className="space-y-2">
                      {['Teachers Hub', 'Business Manager', 'Governance', 'Report Buddy'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                      {['About Us', 'Careers', 'Blog', 'Press'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                      {['Help Center', 'Community', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400">
                  <p>© {new Date().getFullYear()} Schoolgle. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}