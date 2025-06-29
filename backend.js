// // backend.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// let tasks = [];

// app.post('/api/tasks', (req, res) => {
//   const { title, description, dueDate } = req.body;

//   const newTask = {
//     id: Date.now().toString(),      
//     title,
//     description,
//     dueDate,
//     status: 'pending'            
//   };

//   tasks.push(newTask);
 
//   res.status(201).json(newTask);   
// });


// app.get('/api/tasks', (req, res) => {
//   res.json(tasks);
// });

// app.put('/api/tasks/:id', (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   const task = tasks.find(t => t.id === id);
//   if (task) {
//     task.status = status;
//     res.status(200).json(task);
//   } else {
//     res.status(404).json({ error: 'Task not found' });
//   }
// });

// app.delete('/api/tasks/:id', (req, res) => {
//   const { id } = req.params;
//   const index = tasks.findIndex(t => t.id === id);
//   if (index !== -1) {
//     tasks.splice(index, 1);
//     res.status(200).json({ message: 'Task deleted' });
//   } else {
//     res.status(404).json({ error: 'Task not found' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Backend running at http://localhost:${PORT}`);
// });
