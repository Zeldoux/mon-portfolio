const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  imageUrl: String,
  link: String,
});

module.exports = mongoose.model('Project', projectSchema);