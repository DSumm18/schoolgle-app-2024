'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader2 } from 'lucide-react';
import AnimatedSunIcon from './AnimatedSunIcon';
import { useSchoolContext } from '@/contexts/SchoolContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotWidgetProps {
  iconType?: 'animated-sun';
  position?: 'bottom-right' | 'bottom-left';
  greetingMessage?: string;
}

export default function ChatbotWidget({
  iconType = 'animated-sun',
  position = 'bottom-right',
  greetingMessage = 'Hello! I\'m your school assistant. How can I help you today?',
}: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { school } = useSchoolContext();
  
  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus the input field when the chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      // If this is the first time opening with no messages, add greeting
      if (messages.length === 0) {
        setMessages([
          {
            id: 'greeting',
            content: greetingMessage,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      }
    }
  }, [isOpen, greetingMessage, messages.length]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // In a real implementation, this would be an API call to your chatbot backend
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate bot response
      const botResponse = await simulateBotResponse(inputValue, school?.name || 'Schoolgle');
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Error message
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: 'Sorry, I encountered an error. Please try again later.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Positioning classes based on the position prop
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };
  
  return (
    <div className={`chatbot-widget fixed ${positionClasses[position]} z-50`}>
      {/* Chat toggle button with animated sun icon */}
      <button
        className="chatbot-toggle-button relative z-10"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        aria-expanded={isOpen}
      >
        <AnimatedSunIcon 
          isActive={isOpen} 
          size={64} 
        />
      </button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="chatbot-header flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-indigo-600 dark:bg-indigo-800 text-white">
              <div className="flex items-center gap-2">
                <AnimatedSunIcon isActive size={28} />
                <h3 className="font-medium">
                  {school?.name || 'School'} Assistant
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="chatbot-messages p-4 max-h-96 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message mb-4 ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
              
              {/* Bot typing indicator */}
              {isTyping && (
                <div className="message mb-4">
                  <div className="inline-block rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <div className="flex items-center gap-1">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Typing...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="chatbot-input border-t border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 rounded-full bg-indigo-600 text-white disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simulate bot response based on user input
// In a real implementation, this would be replaced with an actual API call
async function simulateBotResponse(userInput: string, schoolName: string): Promise<string> {
  // Convert to lowercase for easier matching
  const input = userInput.toLowerCase();
  
  // Simple pattern matching for common questions
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return `Hello! How can I help you with ${schoolName} related questions today?`;
  } else if (input.includes('office hours') || input.includes('opening hours')) {
    return 'Our school office is typically open Monday to Friday, 8:00 AM to 4:30 PM during term time. Please check the school calendar for any variations.';
  } else if (input.includes('term dates') || input.includes('holidays')) {
    return 'You can find our current term dates in the School Info section. The next holiday period begins on [date placeholder].';
  } else if (input.includes('contact') || input.includes('phone') || input.includes('email')) {
    return `You can contact ${schoolName} reception at info@${schoolName.toLowerCase().replace(/\s+/g, '')}.edu or call 01234 567890.`;
  } else if (input.includes('uniform') || input.includes('dress code')) {
    return 'Our uniform policy is available in the School Info section. Students are expected to wear the appropriate uniform at all times.';
  } else if (input.includes('lunch') || input.includes('menu') || input.includes('food')) {
    return 'Our lunch menu for the week can be found in the School Info section. We offer a variety of nutritious options including vegetarian and special dietary choices.';
  } else if (input.includes('apply') || input.includes('admission') || input.includes('enroll')) {
    return 'For admission inquiries, please visit the Admissions section on our website or contact our admissions team directly.';
  } else if (input.includes('sport') || input.includes('team') || input.includes('club')) {
    return 'We offer a wide range of sports and clubs. You can find the current schedule and sign-up information in the Extracurricular section.';
  } else if (input.includes('homework') || input.includes('assignment')) {
    return 'Homework assignments are posted in the Teaching & Learning module. You can filter by class or subject to find specific assignments.';
  } else if (input.includes('thank')) {
    return 'You\'re welcome! Is there anything else I can help with?';
  } else {
    return 'I don\'t have specific information about that yet. The system administrator can add more knowledge to help me answer your questions better.';
  }
}