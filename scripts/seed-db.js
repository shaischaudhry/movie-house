const { MongoClient } = require('mongodb');
const data = require('../data/data.json');

// Use the MongoDB Atlas connection string
const MONGODB_URI = "mongodb+srv://shaisch143:KGIyvAVkiImpSBey@cluster0.ueq49ov.mongodb.net/moviehouse?retryWrites=true&w=majority&appName=Cluster0";

async function seedDatabase() {
  console.log(`Connecting to: ${MONGODB_URI.replace(/\/\/([^:]+):[^@]+@/, '//***:***@')}`); // Hide password in logs
  
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Explicitly specify the database name
    const db = client.db('moviehouse');
    console.log('Using database: moviehouse');

    // List all collections
    console.log('Existing collections:');
    const collections = await db.listCollections().toArray();
    console.log(collections.map(c => c.name));

    // Clear existing data
    await db.collection('movies').deleteMany({});
    await db.collection('genres').deleteMany({});
    await db.collection('directors').deleteMany({});
    
    console.log('Cleared existing data');

    // Seed genres
    const genresResult = await db.collection('genres').insertMany(data.genres);
    console.log(`Inserted ${data.genres.length} genres with IDs:`, genresResult.insertedIds);
    
    // Seed directors
    const directorsResult = await db.collection('directors').insertMany(data.directors);
    console.log(`Inserted ${data.directors.length} directors with IDs:`, directorsResult.insertedIds);
    
    // Seed movies
    const moviesResult = await db.collection('movies').insertMany(data.movies);
    console.log(`Inserted ${data.movies.length} movies with IDs:`, moviesResult.insertedIds);
    
    // Verify data was inserted
    const moviesCount = await db.collection('movies').countDocuments();
    const genresCount = await db.collection('genres').countDocuments();
    const directorsCount = await db.collection('directors').countDocuments();
    
    console.log(`Verification - Movies: ${moviesCount}, Genres: ${genresCount}, Directors: ${directorsCount}`);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase(); 