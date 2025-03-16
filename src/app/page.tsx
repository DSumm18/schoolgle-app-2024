'use client';

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

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

export default function Home() {
  const { data: session, status } = useSession();
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/30"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-700/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 dark:bg-purple-700/20 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        
        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div 
              className="flex flex-col justify-center space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  AI-Powered Tools for <span className="text-blue-500 dark:text-blue-400">Educators</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Schoolgle helps teachers save time, reduce stress, and focus on what matters most—their students and
                  their wellbeing.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                {status === "authenticated" ? (
                  <Link href="/dashboard">
                    <AnimatedButton size="lg" className="gap-1">
                      Go to Dashboard <ChevronRight className="h-4 w-4" />
                    </AnimatedButton>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <AnimatedButton size="lg" className="gap-1">
                        Try Schoolgle <ChevronRight className="h-4 w-4" />
                      </AnimatedButton>
                    </Link>
                    <Link href="/demo">
                      <AnimatedButton size="lg" variant="outline">
                        Book a Demo
                      </AnimatedButton>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30 blur-3xl" />
              <Image
                src="/placeholder.svg"
                width={550}
                height={550}
                alt="Teacher using Schoolgle dashboard"
                className="relative mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-500 px-3 py-1 text-sm text-white">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">AI Tools for Education</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our platform provides intelligent tools designed specifically for educators to enhance teaching and
                support wellbeing.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link href="/teachers-hub" className="block transition-transform hover:scale-[1.02]">
              <motion.div 
                className="border rounded-xl p-6 border-t-4 border-t-blue-500 dark:border-t-blue-400 h-full"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <h3 className="font-bold mb-2">Teachers Hub</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  AI-powered tools for lesson planning, story creation, and classroom management.
                </p>
              </motion.div>
            </Link>
            <Link href="/school-business-manager" className="block transition-transform hover:scale-[1.02]">
              <motion.div 
                className="border rounded-xl p-6 border-t-4 border-t-red-500 dark:border-t-red-400 h-full"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <h3 className="font-bold mb-2">School Business Manager</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Streamline HR, finance, estates, and other administrative functions.
                </p>
              </motion.div>
            </Link>
            <Link href="/governance" className="block transition-transform hover:scale-[1.02]">
              <motion.div 
                className="border rounded-xl p-6 border-t-4 border-t-yellow-500 dark:border-t-yellow-400 h-full"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <h3 className="font-bold mb-2">Governance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tools for school governors and trustees to monitor and improve school performance.
                </p>
              </motion.div>
            </Link>
            <Link href="/report-buddy" className="block transition-transform hover:scale-[1.02]">
              <motion.div 
                className="border rounded-xl p-6 border-t-4 border-t-green-500 dark:border-t-green-400 h-full"
                variants={featureCardVariants}
                whileHover="hover"
              >
                <h3 className="font-bold mb-2">Report Buddy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Generate personalized student reports with AI assistance and insightful analytics.
                </p>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-500 dark:bg-green-600 px-3 py-1 text-sm text-white">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Loved by Educators</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Hear from teachers who have transformed their classrooms with Schoolgle.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="border rounded-xl p-6 h-full"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4">
                <h3 className="font-bold">Maria Rodriguez</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">High School English Teacher</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Schoolgle has cut my grading time in half. The AI feedback is so accurate that my students are
                getting more detailed comments than I could provide manually."
              </p>
            </motion.div>
            <motion.div 
              className="border rounded-xl p-6 h-full"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4">
                <h3 className="font-bold">James Wilson</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Middle School Science Teacher</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The lesson planning tool is incredible. It generates creative activities that engage my students
                while meeting all our curriculum requirements."
              </p>
            </motion.div>
            <motion.div 
              className="border rounded-xl p-6 h-full"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4">
                <h3 className="font-bold">Priya Patel</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Elementary School Principal</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Since implementing Schoolgle, teacher burnout has decreased by 40% in our school. The wellbeing
                tools have made a real difference for our staff."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-red-500 dark:bg-red-600 px-3 py-1 text-sm text-white">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Education-Friendly Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Affordable plans for individual teachers, schools, and districts.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="border rounded-xl p-6 h-full"
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-6 text-center">
                <h3 className="font-bold text-xl mb-1">Teacher</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">For individual educators</p>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-3xl font-bold">£9</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Basic lesson planning</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Assignment grading</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Personal wellbeing tools</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>5GB storage</span>
                </li>
              </ul>
              
              <Link href="/register" className="w-full">
                <AnimatedButton className="w-full">Get Started</AnimatedButton>
              </Link>
            </motion.div>
            
            <motion.div 
              className="border rounded-xl p-6 h-full border-blue-500 dark:border-blue-400 relative"
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="inline-block rounded-lg bg-blue-500 dark:bg-blue-600 px-3 py-1 text-sm text-white">
                  Popular
                </div>
              </div>
              
              <div className="mb-6 text-center pt-4">
                <h3 className="font-bold text-xl mb-1">School</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">For entire schools</p>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-3xl font-bold">£7</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">/teacher/month</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Everything in Teacher plan</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Advanced curriculum alignment</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>School-wide analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Staff wellbeing dashboard</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>20GB storage per teacher</span>
                </li>
              </ul>
              
              <Link href="/demo" className="w-full">
                <AnimatedButton className="w-full">Get Started</AnimatedButton>
              </Link>
            </motion.div>
            
            <motion.div 
              className="border rounded-xl p-6 h-full"
              variants={fadeIn}
              whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-6 text-center">
                <h3 className="font-bold text-xl mb-1">District</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">For school districts</p>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-3xl font-bold">£5</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">/teacher/month</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Everything in School plan</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>District-wide data insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Custom integration with existing systems</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                  <span>Unlimited storage</span>
                </li>
              </ul>
              
              <Link href="/contact" className="w-full">
                <AnimatedButton className="w-full">Contact Sales</AnimatedButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Teaching?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of educators who use Schoolgle to enhance their teaching and prioritize their
                wellbeing.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <AnimatedButton size="lg" className="gap-1">
                  Start Your Free Trial <ChevronRight className="h-4 w-4" />
                </AnimatedButton>
              </Link>
              <Link href="/demo">
                <AnimatedButton
                  size="lg"
                  variant="outline"
                >
                  Schedule a Demo
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* API Resources Section */}
      <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 max-w-5xl mx-auto"
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