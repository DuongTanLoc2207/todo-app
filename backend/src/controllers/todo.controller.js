const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const asyncHandler = require('../middleware/asyncHandler');

const ALLOWED_SORT_FIELDS = ['createdAt', 'updatedAt', 'title', 'status'];
const TITLE_MAX_LENGTH = 200;
const DESCRIPTION_MAX_LENGTH = 1000;

const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.getAllTodos = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 5, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  const filter = {};

  if (status && ['pending', 'completed'].includes(status)) {
    filter.status = status;
  }

  if (search) {
    filter.title = { $regex: escapeRegex(search), $options: 'i' };
  }

  const sortField = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt';
  const sort = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

  const currentPage = Math.max(parseInt(page, 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(limit, 10) || 5, 1), 50);
  const skip = (currentPage - 1) * pageSize;

  const [todos, totalItems] = await Promise.all([
    Todo.find(filter).sort(sort).skip(skip).limit(pageSize),
    Todo.countDocuments(filter),
  ]);

  res.status(200).json({
    data: todos,
    pagination: {
      currentPage,
      totalPages: Math.ceil(totalItems / pageSize),
      totalItems,
      limit: pageSize,
    },
  });
});

exports.createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Title must be a string' });
  }

  if (!title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (title.trim().length > TITLE_MAX_LENGTH) {
    return res.status(400).json({ message: `Title must not exceed ${TITLE_MAX_LENGTH} characters` });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ message: 'Description must be a string' });
  }

  if (description !== undefined && description.trim().length > DESCRIPTION_MAX_LENGTH) {
    return res.status(400).json({ message: `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters` });
  }

  const todo = await Todo.create({ title, description });
  res.status(201).json(todo);
});

exports.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid todo id format' });
  }

  if (title !== undefined) {
    if (typeof title !== 'string') {
      return res.status(400).json({ message: 'Title must be a string' });
    }
    if (!title.trim()) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }
    if (title.trim().length > TITLE_MAX_LENGTH) {
      return res.status(400).json({ message: `Title must not exceed ${TITLE_MAX_LENGTH} characters` });
    }
  }

  if (description !== undefined) {
    if (typeof description !== 'string') {
      return res.status(400).json({ message: 'Description must be a string' });
    }
    if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
      return res.status(400).json({ message: `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters` });
    }
  }

  const todo = await Todo.findByIdAndUpdate(
    id,
    { title, description },
    { new: true, runValidators: true }
  );

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid todo id format' });
  }

  if (!['pending', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Status must be pending or completed' });
  }

  const todo = await Todo.findByIdAndUpdate(id, { status }, { new: true });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
});

exports.deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid todo id format' });
  }

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json({ message: 'Todo deleted successfully' });
});
