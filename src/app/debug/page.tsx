export default function DebugPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug Page</h1>
      <p>If you can see this page, Next.js routing is working!</p>
      <p>Environment: {process.env.NODE_ENV}</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      
      <h2>Available Routes:</h2>
      <ul>
        <li><a href="/">/</a> - Homepage</li>
        <li><a href="/api/health">/api/health</a> - Health Check</li>
        <li><a href="/saved">/saved</a> - Saved Pages</li>
        <li><a href="/dashboard">/dashboard</a> - Dashboard</li>
      </ul>
    </div>
  )
}