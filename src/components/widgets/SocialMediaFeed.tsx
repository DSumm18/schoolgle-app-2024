'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSchoolContext } from '@/contexts/SchoolContext';
import { 
  Twitter, 
  Facebook, 
  Heart, 
  MessageCircle, 
  Repeat, 
  Calendar, 
  Share2, 
  ThumbsUp, 
  MessageSquare, 
  Share, 
  ExternalLink, 
  Loader2 
} from 'lucide-react';

// Define types for social media posts
interface TwitterPost {
  id: string;
  text: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  timestamp: string;
  stats: {
    likes: number;
    retweets: number;
    replies: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

interface FacebookPost {
  id: string;
  text: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

// Mock data for Twitter posts
const mockTwitterPosts: TwitterPost[] = [
  {
    id: '1',
    text: 'Congratulations to our Year 11 students on their fantastic GCSE results today! We are so proud of all your hard work and achievements. #GCSEResults2023 #ProudSchool',
    author: {
      name: 'Schoolgle Academy',
      handle: '@SchoolgleAcad',
      avatar: '/images/logo.svg',
    },
    timestamp: '2023-08-24T09:30:00Z',
    stats: {
      likes: 45,
      retweets: 12,
      replies: 8,
    },
    media: [
      {
        type: 'image',
        url: '/images/social/gcse-results.jpg',
      },
    ],
  },
  {
    id: '2',
    text: 'Our Year 8 students enjoyed an amazing field trip to the Science Museum yesterday. Great to see so much enthusiasm for STEM subjects! #ScienceEducation #FieldTrip',
    author: {
      name: 'Schoolgle Academy',
      handle: '@SchoolgleAcad',
      avatar: '/images/logo.svg',
    },
    timestamp: '2023-08-21T15:45:00Z',
    stats: {
      likes: 38,
      retweets: 7,
      replies: 5,
    },
    media: [
      {
        type: 'image',
        url: '/images/social/science-trip.jpg',
      },
    ],
  },
  {
    id: '3',
    text: 'Reminder: Parents Evening for Years 9 and 10 is next Thursday from 4:30pm. Bookings can be made through the school portal. Looking forward to seeing you all! #ParentsEvening',
    author: {
      name: 'Schoolgle Academy',
      handle: '@SchoolgleAcad',
      avatar: '/images/logo.svg',
    },
    timestamp: '2023-08-18T12:15:00Z',
    stats: {
      likes: 22,
      retweets: 15,
      replies: 3,
    },
  },
];

// Mock data for Facebook posts
const mockFacebookPosts: FacebookPost[] = [
  {
    id: '1',
    text: 'SPORTS DAY SUCCESS! 🏆 A huge well done to all students who participated in our annual Sports Day yesterday. Blue House took the overall trophy, but we saw amazing performances and team spirit from everyone. Thank you to our PE department for organizing such a wonderful event and to all parents who came to support. Check out some of the highlights below!',
    author: {
      name: 'Schoolgle Academy',
      avatar: '/images/logo.svg',
    },
    timestamp: '2023-07-12T16:30:00Z',
    stats: {
      likes: 89,
      comments: 24,
      shares: 12,
    },
    media: [
      {
        type: 'image',
        url: '/images/social/sports-day1.jpg',
      },
      {
        type: 'image',
        url: '/images/social/sports-day2.jpg',
      },
    ],
  },
  {
    id: '2',
    text: 'VACANCY: We\'re looking for an enthusiastic Teaching Assistant to join our supportive SEND department from September. Full details on our website under "Vacancies". Closing date for applications is August 15th. Please share with anyone who might be interested!',
    author: {
      name: 'Schoolgle Academy',
      avatar: '/images/logo.svg',
    },
    timestamp: '2023-07-30T09:00:00Z',
    stats: {
      likes: 35,
      comments: 7,
      shares: 42,
    },
  },
  {
    id: '3',
    text: 'Exciting news! Our school choir has been selected to perform at the Regional Music Festival in October. Congratulations to all our talented singers and Ms. Johnson for her excellent leadership. Rehearsals will commence in the first week of the new term. #ProudSchool #MusicEducation',
    author: {
      name: 'Schoolgle Academy',
      avatar: '/images/logo.svg',
    },
    timestamp: '2023-08-02T14:20:00Z',
    stats: {
      likes: 112,
      comments: 31,
      shares: 18,
    },
    media: [
      {
        type: 'image',
        url: '/images/social/choir.jpg',
      },
    ],
  },
];

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`;
  } else if (diffInSeconds < 604800) {
    return `${Math.floor(diffInSeconds / 86400)}d`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

// Format numbers for display (e.g., 1200 -> 1.2K)
const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`.replace('.0K', 'K');
  } else {
    return `${(num / 1000000).toFixed(1)}M`.replace('.0M', 'M');
  }
};

interface SocialMediaFeedProps {
  platform?: 'twitter' | 'facebook' | 'all';
  username?: string;
  maxPosts?: number;
  showImages?: boolean;
}

export default function SocialMediaFeed({
  platform = 'all',
  username = '',
  maxPosts = 3,
  showImages = true,
}: SocialMediaFeedProps) {
  const [activePlatform, setActivePlatform] = useState<'twitter' | 'facebook'>(
    platform === 'all' ? 'twitter' : platform
  );
  const [isLoading, setIsLoading] = useState(false);
  const [twitterPosts, setTwitterPosts] = useState<TwitterPost[]>([]);
  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([]);
  const { school } = useSchoolContext();
  
  // In a real application, this would fetch data from the Twitter and Facebook APIs
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, you would fetch from the APIs using the school's social media handles
        // For demonstration, we'll just use the mock data with a delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filter by username if provided
        const filteredTwitterPosts = username
          ? mockTwitterPosts.filter(post => post.author.handle.includes(username))
          : mockTwitterPosts;
          
        const filteredFacebookPosts = username
          ? mockFacebookPosts.filter(post => post.author.name.includes(username))
          : mockFacebookPosts;
          
        setTwitterPosts(filteredTwitterPosts.slice(0, maxPosts));
        setFacebookPosts(filteredFacebookPosts.slice(0, maxPosts));
      } catch (error) {
        console.error('Error fetching social media:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSocialMedia();
  }, [username, maxPosts]);
  
  // Render Twitter post
  const renderTwitterPost = (post: TwitterPost) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="twitter-post p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="font-bold text-gray-900 dark:text-white">{post.author.name}</span>
            <span className="text-gray-500 ml-2 text-sm">{post.author.handle}</span>
            <span className="text-gray-500 mx-1 text-sm">·</span>
            <span className="text-gray-500 text-sm">{formatDate(post.timestamp)}</span>
          </div>
          <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">{post.text}</p>
          
          {showImages && post.media && post.media.length > 0 && (
            <div className={`mt-3 rounded-lg overflow-hidden ${post.media.length > 1 ? 'grid grid-cols-2 gap-1' : ''}`}>
              {post.media.map((media, index) => (
                <div 
                  key={index} 
                  className="relative aspect-video bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={media.url}
                    alt="Post media"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                <Heart size={16} />
              </button>
              <span className="text-xs">{formatNumber(post.stats.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                <Repeat size={16} />
              </button>
              <span className="text-xs">{formatNumber(post.stats.retweets)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <MessageCircle size={16} />
              </button>
              <span className="text-xs">{formatNumber(post.stats.replies)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  // Render Facebook post
  const renderFacebookPost = (post: FacebookPost) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="facebook-post p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="font-bold text-gray-900 dark:text-white">{post.author.name}</span>
            <span className="text-gray-500 mx-1 text-sm">·</span>
            <span className="text-gray-500 text-sm">{formatDate(post.timestamp)}</span>
          </div>
          <p className="mt-1 text-gray-900 dark:text-white whitespace-pre-line">{post.text}</p>
          
          {showImages && post.media && post.media.length > 0 && (
            <div className={`mt-3 rounded-lg overflow-hidden ${post.media.length > 1 ? 'grid grid-cols-2 gap-1' : ''}`}>
              {post.media.map((media, index) => (
                <div 
                  key={index} 
                  className="relative aspect-video bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={media.url}
                    alt="Post media"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-3 flex items-center justify-between text-gray-500">
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <ThumbsUp size={16} />
              </button>
              <span className="text-xs">{formatNumber(post.stats.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <MessageSquare size={16} />
              </button>
              <span className="text-xs">{formatNumber(post.stats.comments)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <Share size={16} />
              </button>
              <span className="text-xs">{formatNumber(post.stats.shares)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className="social-media-feed bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Platform tabs */}
      {platform === 'all' && (
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActivePlatform('twitter')}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activePlatform === 'twitter'
                ? 'text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Twitter size={18} />
            <span>Twitter</span>
          </button>
          <button
            onClick={() => setActivePlatform('facebook')}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activePlatform === 'facebook'
                ? 'text-blue-600 dark:text-blue-500 border-b-2 border-blue-600 dark:border-blue-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Facebook size={18} />
            <span>Facebook</span>
          </button>
        </div>
      )}
      
      {/* Social media feed content */}
      <div className="feed-content">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <p className="mt-4 text-gray-500">Loading social media feed...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activePlatform === 'twitter' && (
              <motion.div
                key="twitter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {twitterPosts.length === 0 ? (
                  <div className="py-8 text-center">
                    <Twitter className="h-12 w-12 mx-auto text-blue-400 opacity-50" />
                    <p className="mt-2 text-gray-500">No Twitter posts available</p>
                  </div>
                ) : (
                  twitterPosts.map(post => renderTwitterPost(post))
                )}
              </motion.div>
            )}
            
            {activePlatform === 'facebook' && (
              <motion.div
                key="facebook"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {facebookPosts.length === 0 ? (
                  <div className="py-8 text-center">
                    <Facebook className="h-12 w-12 mx-auto text-blue-600 opacity-50" />
                    <p className="mt-2 text-gray-500">No Facebook posts available</p>
                  </div>
                ) : (
                  facebookPosts.map(post => renderFacebookPost(post))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      
      {/* Link to view all */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <Link 
          href={`https://${activePlatform}.com/${username || (activePlatform === 'twitter' ? 'SchoolgleAcad' : 'SchoolgleAcademy')}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center justify-center gap-1"
        >
          <span>View all posts on {activePlatform === 'twitter' ? 'Twitter' : 'Facebook'}</span>
          <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}