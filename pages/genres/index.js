import Link from 'next/link'

export default function GenresPage({ genres, genreMovieCounts }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Movie Genres</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map(genre => {
          const movieCount = genreMovieCounts[genre.id] || 0
          
          return (
            <Link href={`/genres/${genre.id}`} key={genre.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{genre.name}</h2>
                  <p className="text-gray-600">
                    {movieCount} {movieCount === 1 ? 'movie' : 'movies'} in this genre
                  </p>
                  <div className="mt-4">
                    <span className="text-blue-600 hover:text-blue-800">
                      Browse movies →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const data = require('../../data/data.json')
  
  // Create a map of genre IDs to movie counts
  const genreMovieCounts = {}
  
  data.movies.forEach(movie => {
    if (!genreMovieCounts[movie.genreId]) {
      genreMovieCounts[movie.genreId] = 0
    }
    genreMovieCounts[movie.genreId]++
  })
  
  return {
    props: {
      genres: data.genres,
      genreMovieCounts
    }
  }
} 