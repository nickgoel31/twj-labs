export const metadata = {
  title: 'TWJ Studio',
  description: 'Manage your website content',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
