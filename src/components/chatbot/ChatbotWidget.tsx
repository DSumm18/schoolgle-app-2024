'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatbotWidgetProps {
  iconType?: 'default' | 'animated-sun';
}

export default function ChatbotWidget({ iconType = 'default' }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot button */}
      <button
        onClick={toggleChat}
        className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat panel (simplified stub) */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-indigo-600 text-white p-4">
            <h3 className="font-medium">Schoolgle Assistant</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">
              This is a stub chatbot widget for demo purposes. In a real implementation, this would be a functional chatbot.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}