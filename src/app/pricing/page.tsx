'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const pricingPlans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    description: "Basic tools for individual teachers",
    features: [
      "AI Lesson Planner (5 per month)",
      "Basic Story Generator",
      "Limited Resource Library Access",
      "Community Support"
    ],
    buttonText: "Get Started",
    buttonLink: "/register",
    highlighted: false,
    color: "border-gray-200 dark:border-gray-700"
  },
  {
    name: "Professional",
    price: "£9.99",
    period: "per month",
    description: "Advanced tools for education professionals",
    features: [
      "Unlimited AI Lesson Planning",
      "Advanced Story Generator",
      "Full Resource Library Access",
      "Report Buddy Basic",
      "Email Support",
      "10 Teacher Accounts"
    ],
    buttonText: "Start Free Trial",
    buttonLink: "/register?plan=pro",
    highlighted: true,
    color: "border-blue-500"
  },
  {
    name: "School",
    price: "£499",
    period: "per month",
    description: "Complete solution for entire schools",
    features: [
      "Everything in Professional",
      "Full Business Manager Suite",
      "Governance Tools",
      "Advanced Report Buddy",
      "Custom Integrations",
      "Priority Support",
      "Unlimited Teacher Accounts"
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact",
    highlighted: false,
    color: "border-gray-200 dark:border-gray-700"
  }
];

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, you can change your plan at any time. If you upgrade, the new features will be instantly available. If you downgrade, you'll continue to have access to your current plan until the end of your billing cycle."
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes, we offer a 20% discount when you choose annual billing for any of our paid plans. This discount is automatically applied at checkout."
  },
  {
    question: "Do you offer special pricing for educational institutions?",
    answer: "Yes, we provide special pricing for schools, colleges, and educational districts. Please contact our sales team for more information about our educational discounts."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and for schools, we can accommodate purchase orders and direct bank transfers."
  },
  {
    question: "Is my data secure with Schoolgle?",
    answer: "Absolutely. We use industry-standard encryption and security practices to protect your data. We are GDPR compliant and never share your information with third parties without your explicit consent."
  },
  {
    question: "Can I try Schoolgle before committing to a paid plan?",
    answer: "Yes, we offer a 14-day free trial of our Professional plan with no credit card required. You can also use our Free plan indefinitely to get a feel for our basic features."
  }
];

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

const PricingCard = ({ plan }: { plan: typeof pricingPlans[0] }) => {
  return (
    <motion.div 
      className={`border-2 rounded-xl p-8 ${plan.highlighted ? 'shadow-lg ring-2 ring-blue-500' : ''} ${plan.color}`}
      variants={fadeIn}
      whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="text-center mb-8">
        {plan.highlighted && (
          <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-4">
            Most Popular
          </span>
        )}
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="flex items-end justify-center mb-2">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-gray-600 dark:text-gray-400 ml-1">/{plan.period}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link
        href={plan.buttonLink}
        className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${
          plan.highlighted
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white'
        }`}
      >
        {plan.buttonText}
      </Link>
    </motion.div>
  );
};

const FAQItem = ({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: typeof faqs[0]; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <motion.div 
      className="border-b border-gray-200 dark:border-gray-700 py-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-gray-600 dark:text-gray-300"
        >
          <p>{faq.answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function PricingPage() {
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  
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
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that works best for your educational needs. All plans include a 14-day free trial.
          </p>
          
          <div className="flex justify-center mt-8 mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full inline-flex">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-white dark:bg-gray-700 shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === 'annual'
                    ? 'bg-white dark:bg-gray-700 shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual
                <span className="ml-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </motion.div>
        
        {/* Enterprise section */}
        <motion.div 
          className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Enterprise Solution</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                Custom solution for large educational networks, districts, and educational authorities with specific requirements.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Contact for Custom Pricing
            </Link>
          </div>
        </motion.div>
        
        {/* FAQs */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                isOpen={openFAQs.includes(index)}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-24 text-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Our team is here to help you find the perfect plan for your educational needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}