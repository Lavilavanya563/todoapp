import './Main.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiMoreVertical } from "react-icons/fi";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [openMenu, setOpenMenu] = useState(null); 
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
      console.log("Tasks from backend:", res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  // Toggle menu for a specific task
  const toggleMenu = (taskId) => {
    setOpenMenu(prev => (prev === taskId ? null : taskId));
  };

  // Delete a task
  const deleteTask = async (id) => {
    if (!id) return alert("Task ID missing!");
    console.log("Deleting task with id:", id);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setOpenMenu(null);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task");
      console.error(err);
    }
  };

  // Mark a task as done
  const markAsDone = async (id) => {
    if (!id) return alert("Task ID missing!");
    console.log("Marking as done ID:", id);
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: "done" });
      setOpenMenu(null);
      fetchTasks();
    } catch (err) {
      alert("Error marking task as done");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="main">
      <Navbar />
      <div className="main-center">
        {tasks.length === 0 ? (
          <>
            <p><span>You don't have any tasks yet</span></p>
            <p>Click on the <span>+</span> button to add one</p>
          </>
        ) : (
          <ul className="task-list">
            {tasks.map((task, i) => (
              <li key={task.id || `${task.title}-${i}`} className="tacard">
                <div className="tacard-header">
                  <h3>{task.title}</h3>
                  <div className="task-options">
                    <FiMoreVertical
                      className="options-icon"
                      onClick={() => toggleMenu(task.id)}
                    />
                    {openMenu === task.id && (
                      <div className="dropdown-menu">
                        {task.status !== "done" && (
                          <button onClick={() => markAsDone(task.id)}>
                            ✅ Mark as done
                          </button>
                        )}
                        <button onClick={() => deleteTask(task.id)}>
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="task-description">{task.description}</p>
                <p className="task-meta">
                  ⏱ {task.dueDate?.slice(0, 10)} •{" "}
                  {task.status === "done" ? (
                    <span style={{ color: "lightgreen" }}>Completed ✅</span>
                  ) : (
                    <span style={{ color: "red" }}>Not completed</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="listbtn">
        <Link to="/addtask">
          <button className="list-btn">+</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
