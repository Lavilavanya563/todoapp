// backend.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// ✅ Create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;

  const newTask = {
    id: Date.now().toString(),      // ✅ generate unique ID
    title,
    description,
    dueDate,
    status: 'pending'              // ✅ default status
  };

  tasks.push(newTask);
  console.log("✅ New Task Created:", newTask);
  res.status(201).json(newTask);   // ✅ return created task
});

// ✅ Get all tasks
app.get('/api/tasks', (req, res) => {
  console.log("📦 Sending tasks:", tasks);
  res.json(tasks);
});

// ✅ Update task status
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = status;
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// ✅ Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
