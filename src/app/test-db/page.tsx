import { testDatabaseConnection } from '@/lib/data';

export default async function TestPage() {
  const dbTest = await testDatabaseConnection();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      <div className={`p-4 rounded-lg ${dbTest.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <h2 className="font-bold">
          {dbTest.success ? '✅ Success' : '❌ Failed'}
        </h2>
        <p>{dbTest.message}</p>
        {dbTest.error && (
          <details className="mt-2">
            <summary>Error Details</summary>
            <pre className="mt-2 text-xs overflow-auto">{dbTest.error}</pre>
          </details>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Environment Check:</h3>
        <ul className="list-disc pl-5">
          <li>NODE_ENV: {process.env.NODE_ENV}</li>
          <li>DATABASE_URL: {process.env.DATABASE_URL ? '✅ Set' : '❌ Not Set'}</li>
          <li>DIRECT_URL: {process.env.DIRECT_URL ? '✅ Set' : '❌ Not Set'}</li>
        </ul>
      </div>
    </div>
  );
}