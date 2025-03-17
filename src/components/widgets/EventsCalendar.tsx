'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';
import { SchoolEvent } from '@/contexts/SchoolContext';

// Event category colors
const categoryColors: Record<string, { bg: string; text: string }> = {
  academic: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-200' },
  sports: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200' },
  holiday: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-200' },
  training: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-200' },
  meeting: { bg: 'bg-gray-100 dark:bg-gray-700/50', text: 'text-gray-800 dark:text-gray-200' },
  deadline: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-200' },
  cultural: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-800 dark:text-pink-200' },
  other: { bg: 'bg-gray-100 dark:bg-gray-700/50', text: 'text-gray-800 dark:text-gray-200' },
};

// Default styling for events without a category
const defaultCategoryStyle = { bg: 'bg-gray-100 dark:bg-gray-700/50', text: 'text-gray-800 dark:text-gray-200' };

// Helper functions
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

interface EventsCalendarProps {
  events: SchoolEvent[];
}

export default function EventsCalendar({ events = [] }: EventsCalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  
  // If no events provided, show empty state
  if (!events || events.length === 0) {
    return (
      <div className="events-calendar-empty p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <Calendar className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No events scheduled</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Events will appear here when they are added to the calendar.
        </p>
      </div>
    );
  }
  
  // Calendar calculations
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Filter events for selected date
  const selectedDateEvents = events.filter(event => {
    const eventStart = new Date(event.startTime);
    return isSameDay(eventStart, selectedDate);
  });
  
  // Filter events for current month (calendar dots)
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.startTime);
      return (
        eventStart.getFullYear() === currentYear &&
        eventStart.getMonth() === currentMonth &&
        eventStart.getDate() === day
      );
    });
  };
  
  // Week days header
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate calendar days array
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayIndex = i - firstDayOfMonth + 1;
    if (dayIndex > 0 && dayIndex <= daysInMonth) {
      return dayIndex;
    }
    return null;
  });
  
  return (
    <div className="events-calendar bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Calendar header with navigation */}
      <div className="calendar-header flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === 'calendar' ? 'list' : 'calendar')}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white px-2 py-1 rounded transition-colors"
          >
            {view === 'calendar' ? 'List View' : 'Calendar View'}
          </button>
          <button
            onClick={prevMonth}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {view === 'calendar' ? (
        <div className="calendar-view p-4">
          {/* Week days header */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="p-2" />;
              }
              
              const date = new Date(currentYear, currentMonth, day);
              const isToday = isSameDay(date, today);
              const isSelected = isSameDay(date, selectedDate);
              const dayEvents = getEventsForDay(day);
              const hasEvents = dayEvents.length > 0;
              
              return (
                <motion.button
                  key={`day-${day}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2 rounded-lg text-center relative ${
                    isToday
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300'
                      : isSelected
                      ? 'bg-gray-100 dark:bg-gray-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isToday
                        ? 'font-bold'
                        : isSelected
                        ? 'font-semibold'
                        : 'font-medium'
                    }`}
                  >
                    {day}
                  </span>
                  
                  {/* Event indicator dots */}
                  {hasEvents && (
                    <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <div
                          key={`dot-${event.id}-${i}`}
                          className={`h-1.5 w-1.5 rounded-full ${
                            categoryColors[event.category || 'other']?.bg || defaultCategoryStyle.bg
                          }`}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Selected day events */}
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h4>
            
            {selectedDateEvents.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                No events scheduled for this day
              </p>
            ) : (
              <div className="space-y-2">
                {selectedDateEvents.map(event => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg ${
                      categoryColors[event.category || 'other']?.bg || defaultCategoryStyle.bg
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h5 className={`font-medium ${
                        categoryColors[event.category || 'other']?.text || defaultCategoryStyle.text
                      }`}>
                        {event.title}
                      </h5>
                      {event.category && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {event.category}
                        </span>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                          {event.allDay && ' (All day)'}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // List view for upcoming events
        <div className="list-view p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upcoming Events
          </h4>
          
          <div className="space-y-2">
            {events
              .filter(event => new Date(event.startTime) >= new Date())
              .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
              .slice(0, 5)
              .map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    {event.category && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        categoryColors[event.category]?.bg || defaultCategoryStyle.bg
                      } ${
                        categoryColors[event.category]?.text || defaultCategoryStyle.text
                      }`}>
                        {event.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    <span>{formatDate(event.startTime)}</span>
                  </div>
                  
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>
                        {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        {event.allDay && ' (All day)'}
                      </span>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {event.description && (
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                      {event.description.length > 100 
                        ? `${event.description.substring(0, 100)}...` 
                        : event.description}
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
          
          {events.filter(event => new Date(event.startTime) >= new Date()).length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
              No upcoming events scheduled
            </p>
          )}
        </div>
      )}
    </div>
  );
}