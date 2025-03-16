'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Headteacher, Oakwood Primary",
    image: "/images/testimonials/sarah.png", // You'll need to add these images
    quote: "Schoolgle has revolutionized how we manage our school. The AI tools have saved our teachers countless hours on administrative tasks, allowing them to focus more on teaching and student wellbeing.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Business Manager, Westside Academy",
    image: "/images/testimonials/michael.png",
    quote: "The School Business Manager tools have streamlined our operations tremendously. Budget tracking is now intuitive, and the procurement system has cut our processing time in half.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Year 6 Teacher, Sunnyvale Elementary",
    image: "/images/testimonials/emma.png",
    quote: "Report Buddy is a game-changer! What used to take me weeks now takes days, and the quality of the reports has actually improved. Parents have noticed the difference too.",
    rating: 4
  },
  {
    name: "Robert Chen",
    role: "Chair of Governors, Hillcrest School",
    image: "/images/testimonials/robert.png",
    quote: "The governance tools provide our board with exactly the insights we need to make informed decisions. The policy generator alone has saved us hundreds of hours.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Deputy Head, Greenfield High School",
    image: "/images/testimonials/priya.png",
    quote: "We've seen a measurable improvement in teaching quality since implementing Schoolgle's Teachers Hub. The AI lesson planner generates creative, curriculum-aligned lessons our teachers can customize.",
    rating: 4
  },
  {
    name: "James Wilson",
    role: "IT Director, Riverdale School District",
    image: "/images/testimonials/james.png",
    quote: "From an IT perspective, Schoolgle has been refreshingly easy to deploy and maintain. The integration with our existing systems was seamless, and the support team is top-notch.",
    rating: 5
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
      variants={fadeIn}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="mb-6">
        <StarRating rating={testimonial.rating} />
      </div>
      
      <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 flex-grow">
        "{testimonial.quote}"
      </blockquote>
      
      <div className="flex items-center">
        <div className="mr-4 relative w-12 h-12 overflow-hidden rounded-full bg-gray-200">
          {/* This is a placeholder. In production, you'd want to add actual images */}
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-600">
            {testimonial.name.charAt(0)}
          </div>
        </div>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsPage() {
  return (
    <div className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            What Our Users Say
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how Schoolgle is transforming education management for schools around the world.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the benefits of Schoolgle's AI-powered education tools for yourself.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg transition-colors">
            Start Free Trial
          </button>
        </motion.div>
      </div>
    </div>
  );
}