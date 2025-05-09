import { useState } from 'react'
import data from '../../data/data.json'
import Link from 'next/link'

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('')

  const filteredMovies = selectedGenre
    ? movies.filter(movie => movie.genreId === selectedGenre)
    : movies

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">All Movies</h1>
      
      <div className="flex gap-4 mb-6">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
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

export async function getServerSideProps() {
  return {
    props: {
      movies: data.movies,
      genres: data.genres
    }
  }
} 