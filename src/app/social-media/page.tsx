'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SocialMediaFeed from '@/components/widgets/SocialMediaFeed';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { useSchoolContext } from '@/contexts/SchoolContext';
import { Twitter, Facebook, Instagram, Youtube, Linkedin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
};

export default function SocialMediaPage() {
  const { school, isLoading } = useSchoolContext();
  const [activeTab, setActiveTab] = useState('twitter');
  
  // Helper function to get social media URL
  const getSocialUrl = (platform: string, handle?: string) => {
    if (!handle) return '#';
    
    switch (platform) {
      case 'twitter':
        return `https://twitter.com/${handle}`;
      case 'facebook':
        return `https://facebook.com/${handle}`;
      case 'instagram':
        return `https://instagram.com/${handle}`;
      case 'youtube':
        return `https://youtube.com/@${handle}`;
      case 'linkedin':
        return `https://linkedin.com/company/${handle}`;
      default:
        return '#';
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading social media...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <motion.main
        className="flex-1 px-4 lg:px-8 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="max-w-screen-xl mx-auto"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {school?.name || 'School'} Social Media
          </h1>
          
          {/* Social Media Links */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Follow Us
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {school?.socialMedia?.twitter && (
                <Link
                  href={getSocialUrl('twitter', school.socialMedia.twitter)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Twitter size={32} className="text-[#1DA1F2] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#1DA1F2] dark:group-hover:text-blue-300 transition-colors">
                    Twitter
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    @{school.socialMedia.twitter}
                    <ExternalLink size={10} />
                  </span>
                </Link>
              )}
              
              {school?.socialMedia?.facebook && (
                <Link
                  href={getSocialUrl('facebook', school.socialMedia.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Facebook size={32} className="text-[#1877F2] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#1877F2] dark:group-hover:text-blue-300 transition-colors">
                    Facebook
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    {school.socialMedia.facebook}
                    <ExternalLink size={10} />
                  </span>
                </Link>
              )}
              
              {school?.socialMedia?.instagram && (
                <Link
                  href={getSocialUrl('instagram', school.socialMedia.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                >
                  <Instagram size={32} className="text-[#E1306C] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#E1306C] dark:group-hover:text-pink-300 transition-colors">
                    Instagram
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    @{school.socialMedia.instagram}
                    <ExternalLink size={10} />
                  </span>
                </Link>
              )}
              
              {school?.socialMedia?.youtube && (
                <Link
                  href={getSocialUrl('youtube', school.socialMedia.youtube)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Youtube size={32} className="text-[#FF0000] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#FF0000] dark:group-hover:text-red-300 transition-colors">
                    YouTube
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    @{school.socialMedia.youtube}
                    <ExternalLink size={10} />
                  </span>
                </Link>
              )}
              
              {school?.socialMedia?.linkedin && (
                <Link
                  href={getSocialUrl('linkedin', school.socialMedia.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Linkedin size={32} className="text-[#0A66C2] mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#0A66C2] dark:group-hover:text-blue-300 transition-colors">
                    LinkedIn
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                    {school.socialMedia.linkedin}
                    <ExternalLink size={10} />
                  </span>
                </Link>
              )}
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
              Stay connected with us on social media for the latest news, events, and updates.
            </p>
          </motion.div>
          
          {/* Social Media Feeds */}
          <motion.div variants={itemVariants}>
            <Tabs 
              defaultValue="twitter" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start mb-6 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                <TabsTrigger 
                  value="twitter"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <Twitter size={16} />
                  <span>Twitter</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="facebook"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <Facebook size={16} />
                  <span>Facebook</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="twitter" className="mt-0">
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-8">
                    <SocialMediaFeed 
                      platform="twitter" 
                      username={school?.socialMedia?.twitter}
                      maxPosts={10}
                      showImages={true}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        About Our Twitter
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Follow us on Twitter for quick updates, important announcements, and snapshots of daily life at {school?.name || 'our school'}.
                      </p>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-2">
                        What we share:
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                        <li>School announcements</li>
                        <li>Event reminders</li>
                        <li>Student achievements</li>
                        <li>Educational resources</li>
                        <li>Community updates</li>
                      </ul>
                      <Link
                        href={`https://twitter.com/${school?.socialMedia?.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-2 px-4 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-medium rounded-md text-sm transition-colors"
                      >
                        <Twitter size={16} className="mr-2" />
                        Follow on Twitter
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="facebook" className="mt-0">
                <div className="grid md:grid-cols-12 gap-6">
                  <div className="md:col-span-8">
                    <SocialMediaFeed 
                      platform="facebook" 
                      username={school?.socialMedia?.facebook}
                      maxPosts={10}
                      showImages={true}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                        About Our Facebook Page
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Our Facebook page is where we share more detailed updates about school activities, events, and achievements. It's a great place to engage with our wider community.
                      </p>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-2">
                        What we share:
                      </h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                        <li>Photo galleries of events</li>
                        <li>Detailed announcements</li>
                        <li>Parent information</li>
                        <li>Community engagement</li>
                        <li>School achievements</li>
                      </ul>
                      <Link
                        href={`https://facebook.com/${school?.socialMedia?.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-2 px-4 bg-[#1877F2] hover:bg-[#166fe0] text-white font-medium rounded-md text-sm transition-colors"
                      >
                        <Facebook size={16} className="mr-2" />
                        Like our Facebook Page
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </motion.main>
      
      <ChatbotWidget iconType="animated-sun" />
    </div>
  );
}