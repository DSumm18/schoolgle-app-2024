export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Schoolgle</h1>
      <p className="text-lg">A comprehensive school management system</p>
      
      <div className="bg-green-100 border border-green-300 rounded-md p-4 text-green-800">
        Schoolgle is now deployed on Vercel! This simplified version demonstrates the core functionality.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p>Access key information about your school in one place.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Management</h2>
          <p>Manage estates, maintenance, and school resources efficiently.</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            <a href="/api/status" className="text-blue-600 hover:underline">
              /api/status
            </a>
            <span className="ml-2 text-gray-600">- Check API status</span>
          </li>
          <li>
            <a href="/api/hello" className="text-blue-600 hover:underline">
              /api/hello
            </a>
            <span className="ml-2 text-gray-600">- Simple hello endpoint</span>
          </li>
          <li>
            <a href="/api/db-test" className="text-blue-600 hover:underline">
              /api/db-test
            </a>
            <span className="ml-2 text-gray-600">- Test database connection</span>
          </li>
        </ul>
      </div>
    </div>
  );
}