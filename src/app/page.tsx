import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Schoolgle Intranet Platform</h1>
        <p className="text-lg text-gray-600">A modern, modular platform for educational institutions</p>
      </header>

      <main className="w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Estate Management Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Activity Management */}
            <Link 
              href="/modules/estates/activity-management"
              className="block p-6 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-blue-800 mb-2">Activity Management</h3>
              <p className="text-sm text-gray-600">Schedule and manage activities across your institution.</p>
              <div className="mt-4 text-blue-600 text-sm font-medium">Explore &rarr;</div>
            </Link>

            {/* Risk Assessment */}
            <Link 
              href="/modules/estates/risk-assessment"
              className="block p-6 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-amber-800 mb-2">Risk Assessment</h3>
              <p className="text-sm text-gray-600">Create and track risk assessments for safety compliance.</p>
              <div className="mt-4 text-amber-600 text-sm font-medium">Explore &rarr;</div>
            </Link>

            {/* Issue Tracker */}
            <Link 
              href="/modules/estates/issue-tracker"
              className="block p-6 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-green-800 mb-2">Issue Tracker</h3>
              <p className="text-sm text-gray-600">Track and manage maintenance issues throughout the school.</p>
              <div className="mt-4 text-green-600 text-sm font-medium">Explore &rarr;</div>
            </Link>

            {/* Incidents */}
            <Link 
              href="/modules/estates/incidents"
              className="block p-6 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg text-purple-800 mb-2">Incidents</h3>
              <p className="text-sm text-gray-600">Report and manage incidents that occur on school grounds.</p>
              <div className="mt-4 text-purple-600 text-sm font-medium">Explore &rarr;</div>
            </Link>
          </div>
        </div>

        <div className="bg-blue-500 text-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy</h2>
          <p className="mb-4">
            This simplified version is ready for deployment. All Estate modules are available 
            with basic functionality in place.
          </p>
          <p>
            Once we confirm successful deployment, we'll enhance the platform with full UI components
            and extended functionality.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Access</h2>
          <p className="mb-6 text-gray-600">
            Administrators can access the module management interface to control which
            modules are enabled for your institution.
          </p>
          <Link 
            href="/admin/modules" 
            className="inline-block px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Module Administration
          </Link>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Schoolgle Intranet Platform. All rights reserved.
      </footer>
    </div>
  )
}