const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text
    });
    const saved = await todo.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
