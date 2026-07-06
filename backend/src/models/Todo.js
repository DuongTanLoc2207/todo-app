const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title must not exceed 200 characters'],
  },
  description: {
    type: String,
    trim: true,
    default: '',
    maxlength: [1000, 'Description must not exceed 1000 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Todo', todoSchema);