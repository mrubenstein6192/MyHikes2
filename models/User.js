const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  googleId: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\../, "A valid email address must be used!"]
  },
  entries: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Entry'
  }]
});

module.exports = mongoose.model('User', UserSchema);