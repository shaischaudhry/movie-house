import clientPromise from '../lib/mongodb';

export async function getDirectors() {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('directors').find({}).toArray();
}

export async function getDirectorById(id) {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('directors').findOne({ id });
}

export default { getDirectors, getDirectorById }; 