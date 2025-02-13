const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  director_name: String,
  production_house: String,
  release_date: String,
  rating: Number,
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
