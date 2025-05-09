import dbConnect from '../lib/mongodb';
import Movie from '../models/Movie';
import Genre from '../models/Genre';
import Director from '../models/Director';
import data from '../data/data.json';

async function seedDatabase() {
  await dbConnect();
  console.log('Connected to MongoDB');

  // Clear existing data
  await Movie.deleteMany({});
  await Genre.deleteMany({});
  await Director.deleteMany({});
  
  console.log('Cleared existing data');

  // Seed genres
  await Genre.insertMany(data.genres);
  console.log(`Inserted ${data.genres.length} genres`);
  
  // Seed directors
  await Director.insertMany(data.directors);
  console.log(`Inserted ${data.directors.length} directors`);
  
  // Seed movies
  await Movie.insertMany(data.movies);
  console.log(`Inserted ${data.movies.length} movies`);
  
  console.log('Database seeded successfully');
  process.exit(0);
}

// Run the seeding function
seedDatabase().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
}); 