'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, Sun, CloudRain, CloudSnow, 
  CloudLightning, CloudDrizzle, CloudFog,
  Loader2
} from 'lucide-react';
import { useSchoolContext } from '@/contexts/SchoolContext';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  high: number;
  low: number;
  location: string;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    icon: string;
    high: number;
    low: number;
  }>;
}

// Mock function to get weather - in a real app, replace with API call
async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  // In a real app, you would call a weather API here
  // For demo purposes, returning mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: 18,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        high: 22,
        low: 14,
        location: 'London, UK',
        humidity: 65,
        windSpeed: 12,
        forecast: [
          { day: 'Mon', icon: 'sunny', high: 22, low: 14 },
          { day: 'Tue', icon: 'partly-cloudy', high: 20, low: 13 },
          { day: 'Wed', icon: 'rainy', high: 18, low: 12 },
          { day: 'Thu', icon: 'partly-cloudy', high: 19, low: 13 },
          { day: 'Fri', icon: 'sunny', high: 21, low: 14 }
        ]
      });
    }, 1000);
  });
}

// Map weather condition to icon component
function getWeatherIcon(condition: string, size: number = 24) {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun size={size} className="text-yellow-500" />;
    case 'cloudy':
      return <Cloud size={size} className="text-gray-500" />;
    case 'partly-cloudy':
      return (
        <div className="relative">
          <Sun size={size} className="text-yellow-500" />
          <Cloud size={size*0.8} className="text-gray-500 absolute -right-2 -bottom-1" />
        </div>
      );
    case 'rainy':
      return <CloudRain size={size} className="text-blue-500" />;
    case 'snowy':
      return <CloudSnow size={size} className="text-blue-200" />;
    case 'stormy':
      return <CloudLightning size={size} className="text-purple-500" />;
    case 'drizzle':
      return <CloudDrizzle size={size} className="text-blue-400" />;
    case 'foggy':
      return <CloudFog size={size} className="text-gray-400" />;
    default:
      return <Cloud size={size} className="text-gray-500" />;
  }
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { school } = useSchoolContext();

  useEffect(() => {
    const fetchWeather = async () => {
      if (!school?.location) return;
      
      try {
        setIsLoading(true);
        const data = await getWeatherData(
          school.location.latitude,
          school.location.longitude
        );
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Unable to load weather data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [school]);

  if (isLoading) {
    return (
      <div className="weather-widget p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-40 flex items-center justify-center">
        <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
          <Loader2 className="animate-spin h-8 w-8 mb-2" />
          <span>Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-widget p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 h-40 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400 text-center">
          <p>Weather information unavailable</p>
          <p className="text-sm mt-1">{error || 'No location set'}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="weather-widget p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="current-weather flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {weather.location}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {weather.temperature}°C
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {weather.condition}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            H: {weather.high}° L: {weather.low}°
          </div>
        </div>
        <div className="weather-icon">
          {getWeatherIcon(weather.icon, 48)}
        </div>
      </div>
      
      <div className="forecast mt-4 grid grid-cols-5 gap-2">
        {weather.forecast.map((day, index) => (
          <div 
            key={index} 
            className="forecast-day flex flex-col items-center"
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {day.day}
            </div>
            <div className="my-1">
              {getWeatherIcon(day.icon, 20)}
            </div>
            <div className="text-xs">
              <span className="font-medium text-gray-900 dark:text-white">{day.high}°</span>{' '}
              <span className="text-gray-500 dark:text-gray-400">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}