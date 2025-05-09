import dbConnect from '../../../lib/mongodb';
import Director from '../../../models/Director';

export default async function handler(req, res) {
  await dbConnect();

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const directors = await Director.find({});
    res.status(200).json(directors);
  } catch (error) {
    console.error('Error fetching directors:', error);
    res.status(500).json({ message: 'Error fetching directors', error: error.message });
  }
} 