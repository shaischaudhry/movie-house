import { getMoviesByGenre } from '../../../../models/Movie';
import { getGenreById } from '../../../../models/Genre';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // First check if the genre exists
    const genre = await getGenreById(id);
    
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    
    // Find all movies that match the genreId
    const movies = await getMoviesByGenre(id);
    
    res.status(200).json(movies);
  } catch (error) {
    console.error(`Error fetching movies for genre ${id}:`, error);
    res.status(500).json({ message: 'Error fetching movies by genre', error: error.message });
  }
} 