import EstateNavigation from '@/components/estate-nav'

export default function ActivityManagementPage() {
  return (
    <div className="p-8">
      <EstateNavigation />
      
      <h1 className="text-3xl font-bold mb-6">Activity Management</h1>
      <p className="mb-4">This is a simplified Activity Management module page for testing deployment.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Recent Activities</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded">School Assembly</li>
            <li className="p-3 bg-gray-50 rounded">Staff Training</li>
            <li className="p-3 bg-gray-50 rounded">Parent-Teacher Conference</li>
            <li className="p-3 bg-gray-50 rounded">Sports Day Planning</li>
          </ul>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Weekly Schedule</h2>
          <div className="space-y-2">
            <div className="p-2 border-l-4 border-blue-500 bg-blue-50">
              <p className="font-medium">Monday</p>
              <p className="text-sm text-gray-600">Staff Meeting (9:00 AM)</p>
            </div>
            <div className="p-2 border-l-4 border-green-500 bg-green-50">
              <p className="font-medium">Wednesday</p>
              <p className="text-sm text-gray-600">Department Planning (2:00 PM)</p>
            </div>
            <div className="p-2 border-l-4 border-purple-500 bg-purple-50">
              <p className="font-medium">Friday</p>
              <p className="text-sm text-gray-600">School Assembly (8:30 AM)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Note: This is a simplified version. The full module will include activity creation, 
          scheduling, and comprehensive management features.
        </p>
      </div>
    </div>
  )
}