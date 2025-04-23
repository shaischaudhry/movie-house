import data from '@/data/data.json'
import Link from 'next/link'

export default function DirectorPage({ params }) {
  const movie = data.movies.find(m => m.id === params.id)
  const director = data.directors.find(d => d.id === movie.directorId)
  const directorMovies = data.movies.filter(m => m.directorId === director.id)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{director.name}</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <p className="text-gray-600">{director.biography}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Other Movies by {director.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {directorMovies.map(movie => (
                <Link href={`/movies/${movie.id}`} key={movie.id}>
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-medium text-gray-900">{movie.title}</h3>
                    <p className="text-sm text-gray-500">Released: {movie.releaseYear}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Link 
              href={`/movies/${params.id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Movie
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 