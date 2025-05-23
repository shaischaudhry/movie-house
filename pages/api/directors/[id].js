import { getDirectorById } from '../../../models/Director';
import { getMoviesByDirector } from '../../../models/Movie';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // Find the director
    const director = await getDirectorById(id);
    
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }
    
    // Find all movies directed by this director
    const movies = await getMoviesByDirector(id);
    
    // Return both the director and their movies
    res.status(200).json({
      director: director,
      movies: movies
    });
  } catch (error) {
    console.error(`Error fetching director with ID ${id}:`, error);
    res.status(500).json({ message: 'Error fetching director', error: error.message });
  }
} 