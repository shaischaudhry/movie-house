import clientPromise from '../lib/mongodb';

export async function getMovies() {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('movies').find({}).toArray();
}

export async function getMovieById(id) {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('movies').findOne({ id });
}

export async function getMoviesByGenre(genreId) {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('movies').find({ genreId }).toArray();
}

export async function getMoviesByDirector(directorId) {
  const client = await clientPromise;
  const db = client.db('moviehouse');
  return await db.collection('movies').find({ directorId }).toArray();
}

export default { getMovies, getMovieById, getMoviesByGenre, getMoviesByDirector }; 