const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  updateTodo,
  updateStatus,
  deleteTodo,
} = require('../controllers/todo.controller');

router.get('/', getAllTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteTodo);

module.exports = router;