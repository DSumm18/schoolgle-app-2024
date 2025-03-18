import Link from 'next/link'

export default function ModulesAdminPage() {
  const moduleCategories = [
    {
      name: "Estates",
      modules: [
        { id: "activity-management", name: "Activity Management", enabled: true },
        { id: "risk-assessment", name: "Risk Assessment", enabled: true },
        { id: "issue-tracker", name: "School Issue Tracker", enabled: true },
        { id: "incidents", name: "Schoolgle Incidents", enabled: true }
      ]
    },
    {
      name: "Finance",
      modules: [
        { id: "budget-planner", name: "Budget Planner", enabled: false },
        { id: "expense-tracker", name: "Expense Tracker", enabled: false }
      ]
    },
    {
      name: "Teaching & Learning",
      modules: [
        { id: "lesson-planner", name: "Lesson Planner", enabled: false },
        { id: "assessment-tracker", name: "Assessment Tracker", enabled: false }
      ]
    }
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Module Administration</h1>
        <Link 
          href="/"
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Module Status</h2>
        <p className="text-blue-700">
          Estate modules are currently enabled and ready for testing. 
          Additional module categories will be available in future updates.
        </p>
      </div>

      {moduleCategories.map((category) => (
        <div key={category.name} className="mb-8">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h2>
          <div className="grid gap-4">
            {category.modules.map((module) => (
              <div 
                key={module.id}
                className={`p-4 rounded-lg border flex justify-between items-center ${
                  module.enabled 
                    ? 'bg-white border-gray-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div>
                  <h3 className="font-semibold">{module.name}</h3>
                  <p className="text-sm text-gray-500">
                    {module.enabled 
                      ? 'Module is active and available to users'
                      : 'Module is currently inactive'
                    }
                  </p>
                </div>
                <div className="flex items-center">
                  <span 
                    className={`inline-block w-16 text-center text-xs font-medium py-1 px-2 rounded-full ${
                      module.enabled 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {module.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  {module.enabled && (
                    <Link 
                      href={`/modules/estates/${module.id}`}
                      className="ml-4 text-sm text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 text-sm">
          Note: This is a simplified version of the module administration interface.
          The full version will include detailed controls for module settings,
          permissions, and configuration options.
        </p>
      </div>
    </div>
  )
}