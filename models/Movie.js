import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  genreId: {
    type: String,
    required: true
  },
  directorId: {
    type: String,
    required: true
  }
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema); 