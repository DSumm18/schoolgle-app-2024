import Link from 'next/link'

export default function EstateNavigation() {
  return (
    <nav className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Estate Modules</h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/modules/estates/activity-management"
          className="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Activity Management
        </Link>
        <Link
          href="/modules/estates/risk-assessment"
          className="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Risk Assessment
        </Link>
        <Link
          href="/modules/estates/issue-tracker"
          className="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Issue Tracker
        </Link>
        <Link
          href="/modules/estates/incidents"
          className="px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Incidents
        </Link>
      </div>
    </nav>
  )
}