import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import { Metadata } from 'next';
import Link from 'next/link';
import { SchoolgleLogo } from '@/components/SchoolgleLogo';

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
            <Navbar />
            <main className="flex-grow">{children}</main>
            
            <footer className="w-full border-t bg-background py-6 md:py-12">
              <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Link href="/">
                        <SchoolgleLogo size="text-2xl" />
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">AI tools for educators, by educators.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Product</h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#features"
                          className="text-sm text-muted-foreground hover:text-foreground relative group"
                        >
                          Features
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#pricing"
                          className="text-sm text-muted-foreground hover:text-foreground relative group"
                        >
                          Pricing
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </a>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground relative group">
                          Integrations
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground relative group">
                          About
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground relative group">
                          Blog
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#contact"
                          className="text-sm text-muted-foreground hover:text-foreground relative group"
                        >
                          Contact
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Resources</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground relative group">
                          Help Center
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground relative group">
                          Privacy
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground relative group">
                          Terms
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all group-hover:w-full"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Schoolgle. All rights reserved.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <span className="sr-only">Twitter</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}