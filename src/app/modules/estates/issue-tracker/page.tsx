import EstateNavigation from '@/components/estate-nav'

export default function IssueTrackerPage() {
  return (
    <div className="p-8">
      <EstateNavigation />
      
      <h1 className="text-3xl font-bold mb-6">School Issue Tracker</h1>
      <p className="mb-4">This is a simplified School Issue Tracker module page for testing deployment.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
          <div className="p-6 bg-white rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-3">Recent Issues</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Issue</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">Broken Window</td>
                    <td className="px-4 py-2">Room 203</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In Progress</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Faulty Lighting</td>
                    <td className="px-4 py-2">Main Hall</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">Leaking Roof</td>
                    <td className="px-4 py-2">Library</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Assigned</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Damaged Playground Equipment</td>
                    <td className="px-4 py-2">North Playground</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">New</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Issue Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>New</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span>In Progress</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Resolved</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">12</span>
              </div>
              <div className="pt-4 border-t mt-4">
                <div className="text-sm text-gray-500 mb-1">Resolution Rate</div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-2 bg-green-500" style={{ width: '75%' }}></div>
                </div>
                <div className="text-right text-sm mt-1">75%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Note: This is a simplified version. The full module will include issue reporting,
          assignment, tracking, and resolution workflows.
        </p>
      </div>
    </div>
  )
}