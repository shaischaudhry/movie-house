import clientPromise from '../lib/mongodb';

export async function getGenres() {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('genres').find({}).toArray();
}

export async function getGenreById(id) {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('genres').findOne({ id });
}

export default { getGenres, getGenreById }; 