const mongoose = require('mongoose');

const { Schema } = mongoose;

const HikeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true 
  },
  date: {
    type: String
  },
  distance: {
    type: String
  },
  time: {
    type: String
  },
  difficulty: {
    type: String
  },
  dogs: {
    type: String
  },
  experience: {
    type: String
  }

});

module.exports = mongoose.model('Hike', HikeSchema);