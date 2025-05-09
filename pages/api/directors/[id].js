import dbConnect from '../../../lib/mongodb';
import Director from '../../../models/Director';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  await dbConnect();

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // Find the director
    const director = await Director.findOne({ id: id });
    
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }
    
    // Find all movies directed by this director
    const movies = await Movie.find({ directorId: id });
    
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