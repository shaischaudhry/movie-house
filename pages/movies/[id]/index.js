import data from '../../../data/data.json'
import Link from 'next/link'

export default function MoviePage({ movie, genre, director }) {
  if (!movie) {
    return <div>Movie not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{movie.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Release Year:</span> {movie.releaseYear}</p>
                <p><span className="font-medium">Genre:</span> {genre.name}</p>
                <p><span className="font-medium">Rating:</span> {movie.rating}/10</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p className="font-medium">{director.name}</p>
              <p className="text-gray-600 mt-2">{director.biography}</p>
              <Link 
                href={`/directors/${director.id}`}
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                View Director Profile →
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{movie.description}</p>
          </div>

          <div className="mt-8">
            <Link 
              href="/movies"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const movieId = params.id
  const movie = data.movies.find(m => m.id === movieId)
  
  if (!movie) {
    return {
      notFound: true
    }
  }
  
  const genre = data.genres.find(g => g.id === movie.genreId)
  const director = data.directors.find(d => d.id === movie.directorId)
  
  return {
    props: {
      movie,
      genre,
      director
    }
  }
} 