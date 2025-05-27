const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  genre: String,
  director: String,
  rating: Number,
  image: String,
  userId: String
});

module.exports = mongoose.model('Movie', movieSchema);
