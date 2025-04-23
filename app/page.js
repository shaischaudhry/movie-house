import data from '../data/data.json'
import Link from 'next/link'

export default function Home() {
  // Sort movies by rating and get top 3
  const trendingMovies = [...data.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Trending Movies</h1>
        <Link 
          href="/genres" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Genres
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{movie.title}</h2>
              <p className="text-gray-600 mb-4">{movie.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Released: {movie.releaseYear}</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                  Rating: {movie.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 