'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    y: -10,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: 0.3 
    }
  }
};

// Feature Card Component
const FeatureCard = ({ title, description, color, icon }: { 
  title: string; 
  description: string; 
  color: string;
  icon: string;
}) => {
  return (
    <motion.div
      className={`${color} rounded-xl p-6 text-left h-full`}
      variants={featureCardVariants}
      whileHover="hover"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

export default function Home() {
  const { status } = useSession();
  
  const features = [
    {
      title: "Teachers Hub",
      description: "AI-powered tools for lesson planning, story creation, and classroom management.",
      color: "bg-blue-50 dark:bg-blue-900/20",
      icon: "👩‍🏫"
    },
    {
      title: "School Business Manager",
      description: "Streamline HR, finance, estates, and other administrative functions.",
      color: "bg-red-50 dark:bg-red-900/20",
      icon: "📊"
    },
    {
      title: "Governance",
      description: "Tools for school governors and trustees to monitor and improve school performance.",
      color: "bg-yellow-50 dark:bg-yellow-900/20",
      icon: "👥"
    },
    {
      title: "Report Buddy",
      description: "Generate personalized student reports with AI assistance and insightful analytics.",
      color: "bg-green-50 dark:bg-green-900/20",
      icon: "📝"
    }
  ];
  
  return (
    <>
      {/* Hero Section with gradient background */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900/30 -z-10"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-700/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 dark:bg-purple-700/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Features
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              AI Tools for Education
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Our platform provides intelligent tools designed specifically for educators to enhance teaching and support wellbeing.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {status === 'authenticated' ? (
                <Link 
                  href="/dashboard" 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    href="/register" 
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Get Started Free
                  </Link>
                  <Link 
                    href="/login" 
                    className="px-8 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    Log In
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 -mb-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
            <path 
              fill="currentColor" 
              fillOpacity="1" 
              className="text-white dark:text-gray-900"
              d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                icon={feature.icon}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Schools Worldwide</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of educational institutions that use Schoolgle to improve operations and educational outcomes.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { number: "3,500+", label: "Schools" },
              { number: "125,000+", label: "Teachers" },
              { number: "2.4M+", label: "Students" },
              { number: "98%", label: "Satisfaction" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeIn}
              >
                <p className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.number}</p>
                <p className="text-lg text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your school?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of schools already using Schoolgle to improve educational outcomes and operational efficiency.
            </p>
            
            <Link 
              href="/register" 
              className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-block"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* API Resources Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6">API Resources</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Integrate Schoolgle's powerful features directly into your existing systems with our comprehensive API:
            </p>
            
            <div className="space-y-4">
              {[
                { 
                  method: "GET", 
                  endpoint: "/api/status", 
                  description: "Check API status and health" 
                },
                { 
                  method: "GET", 
                  endpoint: "/api/hello", 
                  description: "Simple hello endpoint for testing" 
                },
                { 
                  method: "GET", 
                  endpoint: "/api/db-test", 
                  description: "Test database connection and functionality" 
                }
              ].map((api, index) => (
                <div key={index} className="flex items-start">
                  <span className={`
                    px-2 py-1 rounded-md text-xs font-mono font-bold mr-3 
                    ${api.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}
                    ${api.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : ''}
                    ${api.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' : ''}
                    ${api.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : ''}
                  `}>
                    {api.method}
                  </span>
                  <div>
                    <Link 
                      href={api.endpoint}
                      className="font-mono text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {api.endpoint}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{api.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Note:</span> Full API documentation is available to authenticated users in the developer portal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}