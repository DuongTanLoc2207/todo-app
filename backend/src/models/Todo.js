const mongoose = require('mongoose');
const { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } = require('../constants/todo.constants');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tiêu đề là bắt buộc'],
    trim: true,
    maxlength: [TITLE_MAX_LENGTH, `Tiêu đề không được vượt quá ${TITLE_MAX_LENGTH} ký tự`],
  },
  description: {
    type: String,
    trim: true,
    default: '',
    maxlength: [DESCRIPTION_MAX_LENGTH, `Mô tả không được vượt quá ${DESCRIPTION_MAX_LENGTH} ký tự`],
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