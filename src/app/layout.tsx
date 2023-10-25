import type { Metadata } from 'next'
import './globals.css'
import { Lexend } from 'next/font/google';
import { cn } from '@/lib/utils'
import { Provider } from '@/components/Providers'
import { Toaster } from '@/components/ui/toaster'

export const dynamic = "force-dynamic"
const lexend = Lexend({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Learning Odyssey',
  description: 'A journey app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        lexend.className, 'antialiased overflow-y-auto'
      )}>
        <Provider>

          {children}
          <Toaster />
        </Provider>

      </body>
    </html>
  )
}
