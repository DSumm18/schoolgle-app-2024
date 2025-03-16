'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Dashboard Widgets
const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="bg-white rounded-lg shadow p-5 flex items-center">
    <div className="rounded-full bg-blue-100 p-3 mr-4">
      <span className="text-2xl text-blue-600">{icon}</span>
    </div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-lg shadow p-5">
    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {[
        { action: 'Report submitted', user: 'Sarah Johnson', time: '2 hours ago' },
        { action: 'Maintenance request created', user: 'John Smith', time: '3 hours ago' },
        { action: 'Resource updated', user: 'Emma Williams', time: '5 hours ago' }
      ].map((activity, i) => (
        <div key={i} className="flex items-start pb-3 border-b border-gray-100">
          <div className="w-1 h-1 bg-blue-500 rounded-full mt-3 mr-2"></div>
          <div>
            <p className="font-medium">{activity.action}</p>
            <p className="text-sm text-gray-500">By {activity.user} · {activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TasksList = () => (
  <div className="bg-white rounded-lg shadow p-5">
    <h3 className="font-semibold text-lg mb-4">Tasks</h3>
    <div className="space-y-3">
      {[
        { title: 'Review monthly reports', priority: 'High', dueDate: 'Today' },
        { title: 'Prepare for board meeting', priority: 'Medium', dueDate: 'Tomorrow' },
        { title: 'Update resource inventory', priority: 'Low', dueDate: 'Next week' }
      ].map((task, i) => (
        <div key={i} className="flex justify-between items-center py-2 px-3 border-b border-gray-100">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-3"
            />
            <span>{task.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded ${
              task.priority === 'High' ? 'bg-red-100 text-red-700' :
              task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {task.priority}
            </span>
            <span className="text-sm text-gray-500">{task.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [status, router]);

  if (loading || status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Welcome back, {session?.user?.name || 'User'}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Students" value={1245} icon="👨‍🎓" />
        <StatCard title="Staff Members" value={83} icon="👩‍🏫" />
        <StatCard title="Facilities" value={24} icon="🏢" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          <RecentActivity />
          
          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Add Student', icon: '➕' },
                { name: 'Generate Report', icon: '📊' },
                { name: 'Manage Staff', icon: '👥' },
                { name: 'Facility Booking', icon: '🗓️' }
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="text-2xl mb-2">{action.icon}</span>
                  <span className="text-sm">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <TasksList />
          
          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {[
                { title: 'Staff Meeting', date: 'Today, 2:00 PM', location: 'Conference Room A' },
                { title: 'Parent-Teacher Conference', date: 'Tomorrow, 4:30 PM', location: 'Main Hall' },
                { title: 'Board Meeting', date: 'March 20, 10:00 AM', location: 'Executive Suite' }
              ].map((event, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-3 py-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}