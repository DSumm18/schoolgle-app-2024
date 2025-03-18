import EstateNavigation from '@/components/estate-nav'

export default function IncidentsPage() {
  return (
    <div className="p-8">
      <EstateNavigation />
      
      <h1 className="text-3xl font-bold mb-6">Schoolgle Incidents</h1>
      <p className="mb-4">This is a simplified Incidents module page for testing deployment.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-3">Recent Incidents</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-between">
                  <h3 className="font-medium text-red-800">Student Injury - Playground</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">High</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Reported: March 16, 2024</p>
                <p className="text-sm mt-2">Student fell from playground equipment and required first aid.</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">ID: INC-2024-032</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">In Progress</span>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between">
                  <h3 className="font-medium text-yellow-800">Building Access Issue - Science Wing</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Reported: March 15, 2024</p>
                <p className="text-sm mt-2">Card access system malfunction preventing staff entry.</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">ID: INC-2024-031</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between">
                  <h3 className="font-medium text-blue-800">Water Leak - Staff Room</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Low</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Reported: March 12, 2024</p>
                <p className="text-sm mt-2">Minor water leak from ceiling after heavy rainfall.</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">ID: INC-2024-029</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-3">Incident Summary</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">By Priority</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>High</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Medium</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Low</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">12</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-500">By Status</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>New</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>In Progress</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Resolved</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">16</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium text-gray-500">Monthly Trend</h3>
                <div className="h-32 mt-2 flex items-end space-x-2">
                  <div className="w-1/5 bg-blue-200 rounded-t" style={{ height: '30%' }}>
                    <div className="text-xs text-center mt-2">Jan</div>
                  </div>
                  <div className="w-1/5 bg-blue-300 rounded-t" style={{ height: '50%' }}>
                    <div className="text-xs text-center mt-2">Feb</div>
                  </div>
                  <div className="w-1/5 bg-blue-400 rounded-t" style={{ height: '40%' }}>
                    <div className="text-xs text-center mt-2">Mar</div>
                  </div>
                  <div className="w-1/5 bg-blue-500 rounded-t" style={{ height: '25%' }}>
                    <div className="text-xs text-center mt-2">Apr</div>
                  </div>
                  <div className="w-1/5 bg-blue-600 rounded-t" style={{ height: '15%' }}>
                    <div className="text-xs text-center mt-2">May</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Note: This is a simplified version. The full module will include incident reporting,
          classification, investigation workflows, and comprehensive analytics.
        </p>
      </div>
    </div>
  )
}