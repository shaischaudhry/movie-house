import dbConnect from '../../../lib/mongodb';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  await dbConnect();

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
} 