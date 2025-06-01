export default function DebugDeployment() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Debug Deployment Page</h1>
      <p>Current time: {new Date().toISOString()}</p>
      <p>If you can see this, Next.js routing is working!</p>
      <p>This page was created to test deployment.</p>
    </div>
  )
}