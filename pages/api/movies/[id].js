import { getMovieById } from '../../../models/Movie';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const movie = await getMovieById(id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    res.status(500).json({ message: 'Error fetching movie', error: error.message });
  }
} 