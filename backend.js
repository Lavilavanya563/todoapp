const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  status: { type: String, default: 'pending' },
  sharedWith: [String]  // For shared task feature
});

const Task = mongoose.model('Task', taskSchema);

io.on('connection', (socket) => {
  console.log('🟢 New client connected');

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, dueDate, sharedWith } = req.body;
  try {
    const newTask = await Task.create({ title, description, dueDate, sharedWith });
    io.emit('taskCreated', newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating task' });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (updatedTask) {
      io.emit('taskUpdated', updatedTask);
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      io.emit('taskDeleted', deletedTask);
      res.json({ message: 'Task deleted' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
