const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' });
});

module.exports = app;