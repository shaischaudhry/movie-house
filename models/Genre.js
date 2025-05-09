import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

export default mongoose.models.Genre || mongoose.model('Genre', GenreSchema); 