export default function TestMinimal() {
  return (
    <div>
      <h1>Minimal Test</h1>
      <p>This is the most basic page possible.</p>
      <p>No imports, no client components, just pure server-side rendering.</p>
    </div>
  )
}

export const runtime = 'nodejs'
export const dynamic = 'auto'