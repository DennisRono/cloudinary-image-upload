import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/output.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cloudinary Image Upload V2',
  description: 'Image Upload to Cloudinary Example',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ToastContainer hideProgressBar />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
