export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Test</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

export const runtime = 'nodejs'