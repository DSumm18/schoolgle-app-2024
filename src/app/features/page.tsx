'use client';

import { motion } from '@/lib/motion';
import Link from 'next/link';

const featuresData = [
  {
    title: "Teachers Hub",
    description: "AI-powered tools to enhance classroom teaching and lesson planning.",
    color: "bg-blue-50 dark:bg-blue-900/20",
    icon: "👩‍🏫",
    features: [
      "AI Lesson Planner - Create engaging lessons in seconds",
      "Story Generator - Craft custom stories for your class",
      "Worksheet Creator - Generate printable activities",
      "Marking Assistant - Save time on assessments",
      "Resource Library - Access thousands of materials"
    ]
  },
  {
    title: "School Business Manager",
    description: "Streamline administrative tasks and improve operational efficiency.",
    color: "bg-red-50 dark:bg-red-900/20",
    icon: "📊",
    features: [
      "HR Management - Track staff records and recruitment",
      "Financial Dashboard - Monitor budgets and spending",
      "Procurement System - Streamline purchasing process",
      "Facilities Management - Maintain school buildings",
      "Compliance Tracker - Stay on top of regulations"
    ]
  },
  {
    title: "Governance",
    description: "Tools to support school governors and trustees in decision-making.",
    color: "bg-yellow-50 dark:bg-yellow-900/20",
    icon: "👥",
    features: [
      "Performance Analytics - Track key school metrics",
      "Policy Generator - Create compliant school policies",
      "Meeting Assistant - Prepare agendas and minutes",
      "Strategic Planning - Set and monitor school goals",
      "Inspection Preparation - Ready your school for review"
    ]
  },
  {
    title: "Report Buddy",
    description: "Generate personalized student reports with AI assistance.",
    color: "bg-green-50 dark:bg-green-900/20",
    icon: "📝",
    features: [
      "Report Writer - Generate personalized comments",
      "Progress Tracker - Monitor student development",
      "Parent Portal - Share results and feedback",
      "Data Visualizer - Create graphs and charts",
      "Batch Processing - Generate multiple reports at once"
    ]
  }
];

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

export default function FeaturesPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            Our Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            AI Tools for Education
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools is designed to revolutionize education management and teaching practices.
          </p>
        </motion.div>

        <div className="space-y-24">
          {featuresData.map((category, idx) => (
            <motion.section 
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className={idx % 2 === 0 ? "" : "flex flex-col md:flex-row-reverse"}
            >
              <motion.div
                className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? '' : 'flex-row-reverse'}`}
                variants={fadeIn}
              >
                <div className="md:w-1/2">
                  <div className={`${category.color} p-6 rounded-2xl inline-flex mb-6`}>
                    <span className="text-5xl">{category.icon}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                    {category.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {category.features.map((feature, featureIdx) => (
                      <motion.li 
                        key={featureIdx}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIdx * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link
                    href="#"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
                
                <div className="md:w-1/2">
                  <div className={`${category.color} rounded-2xl p-8 h-full min-h-[300px] flex items-center justify-center`}>
                    <div className="text-8xl">{category.icon}</div>
                  </div>
                </div>
              </motion.div>
            </motion.section>
          ))}
        </div>
        
        <motion.div 
          className="mt-24 text-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to transform your school?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of schools already using Schoolgle to enhance teaching and improve operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/register" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-lg transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}