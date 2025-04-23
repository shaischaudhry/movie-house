import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Movie House',
  description: 'Your ultimate movie discovery platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/" className="flex items-center text-xl font-bold text-gray-800">
                  Movie House
                </Link>
                <div className="hidden md:flex items-center space-x-4 ml-10">
                  <Link href="/movies" className="text-gray-600 hover:text-gray-900">Movies</Link>
                  <Link href="/genres" className="text-gray-600 hover:text-gray-900">Genres</Link>
                  <Link href="/directors" className="text-gray-600 hover:text-gray-900">Directors</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
} 