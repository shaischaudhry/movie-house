import dbConnect from '../../../lib/mongodb';
import Genre from '../../../models/Genre';

export default async function handler(req, res) {
  await dbConnect();

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const genres = await Genre.find({});
    res.status(200).json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
} 