import EstateNavigation from '@/components/estate-nav'

export default function RiskAssessmentPage() {
  return (
    <div className="p-8">
      <EstateNavigation />
      
      <h1 className="text-3xl font-bold mb-6">Risk Assessment</h1>
      <p className="mb-4">This is a simplified Risk Assessment module page for testing deployment.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-3">Recent Assessments</h2>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
                <div className="font-medium">Science Lab Equipment</div>
                <div className="text-sm text-gray-600">Last updated: March 15, 2024</div>
              </li>
              <li className="p-3 bg-gray-50 rounded border-l-4 border-yellow-500">
                <div className="font-medium">Sports Field Safety</div>
                <div className="text-sm text-gray-600">Last updated: March 10, 2024</div>
              </li>
              <li className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
                <div className="font-medium">Cafeteria Health Standards</div>
                <div className="text-sm text-gray-600">Last updated: March 5, 2024</div>
              </li>
              <li className="p-3 bg-gray-50 rounded border-l-4 border-red-500">
                <div className="font-medium">Fire Evacuation Routes</div>
                <div className="text-sm text-gray-600">Last updated: February 28, 2024</div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Risk Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Low Risk</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">16</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Medium Risk</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span>High Risk</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">2</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden mt-2 relative">
                <div className="absolute inset-0">
                  <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-[64%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-blue-800">
          Note: This is a simplified version. The full module will include risk assessment creation, 
          comprehensive analysis tools, and mitigation planning features.
        </p>
      </div>
    </div>
  )
}