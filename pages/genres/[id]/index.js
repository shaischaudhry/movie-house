import Link from 'next/link'

export default function GenrePage({ genre, genreMovies }) {
  if (!genre) {
    return <div>Genre not found</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{genre.name} Movies</h1>
        <Link 
          href="/genres"
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Genres
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genreMovies.map(movie => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = require('../../../data/data.json')
  
  const genreId = params.id
  const genre = data.genres.find(g => g.id === genreId)
  
  if (!genre) {
    return {
      notFound: true
    }
  }
  
  const genreMovies = data.movies.filter(movie => movie.genreId === genreId)
  
  return {
    props: {
      genre,
      genreMovies
    }
  }
} 