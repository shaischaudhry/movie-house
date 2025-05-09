import Link from 'next/link'

export default function DirectorsPage({ directors, directorMoviesMap }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Movie Directors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directors.map(director => {
          const directorMovies = directorMoviesMap[director.id] || []
          
          return (
            <div key={director.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{director.name}</h2>
                <p className="text-gray-600 mb-4">{director.biography}</p>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Movies:</h3>
                  <div className="space-y-2">
                    {directorMovies.map(movie => (
                      <Link href={`/movies/${movie.id}`} key={movie.id}>
                        <div className="text-blue-600 hover:text-blue-800">
                          {movie.title} ({movie.releaseYear})
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = require('../../data/data.json')
  
  // Create a map of director IDs to their movies
  const directorMoviesMap = {}
  
  data.movies.forEach(movie => {
    if (!directorMoviesMap[movie.directorId]) {
      directorMoviesMap[movie.directorId] = []
    }
    directorMoviesMap[movie.directorId].push(movie)
  })
  
  return {
    props: {
      directors: data.directors,
      directorMoviesMap
    }
  }
} 