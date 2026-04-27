import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
  title: 'Oasis Group — Premium Real Estate Developer | Delhi NCR',
  description: 'Oasis Group has delivered 2.2 million sq. ft. of premium residential spaces in Delhi NCR since 2002. Explore Grandstand, Venetia Heights, and more.',
  keywords: 'Oasis Group, real estate Noida, Yamuna Expressway flats, Venetia Heights, Grandstand, NRI property Delhi NCR',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><ConditionalLayout>{children}</ConditionalLayout></body>
    </html>
  )
}
