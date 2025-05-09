import Link from 'next/link'

export default function DirectorPage({ director, directorMovies }) {
  if (!director) {
    return <div>Director not found</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{director.name}</h1>
        <Link 
          href="/directors"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Directors
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Biography</h2>
          <p className="text-gray-600 mb-6">{director.biography}</p>
          
          <h2 className="text-xl font-semibold mb-4">Filmography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directorMovies.map(movie => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900">{movie.title}</h3>
                  <p className="text-sm text-gray-500">Released: {movie.releaseYear}</p>
                  <p className="text-sm mt-2">Rating: {movie.rating}/10</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = require('../../../data/data.json')
  
  const directorId = params.id
  const director = data.directors.find(d => d.id === directorId)
  
  if (!director) {
    return {
      notFound: true
    }
  }
  
  const directorMovies = data.movies.filter(movie => movie.directorId === directorId)
  
  return {
    props: {
      director,
      directorMovies
    }
  }
}