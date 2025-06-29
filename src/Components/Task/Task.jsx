import React, { useState } from 'react';
import { FiChevronLeft } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import './Task.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Task = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/tasks", formData);
      navigate("/");
    } catch (err) {
      alert("Error creating task");
      console.error(err);
    }
  };

  return (
    <div className="task">
      <div className="nav">
        <Link to="/"><FiChevronLeft size={30} /></Link>
        <div className="heading"><h1>Add New Task</h1></div>
        <FaUserCircle size={50} className='user' title='USER' />
      </div>

      <div className="task-card">
        <div className="avatar-wrapper">
          <div className="avatar"></div>
          <div className="edit-icon"><FaPenToSquare size={12} /></div>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Name *"
            name='title'
            className="input"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Task Description"
            className="textarea"
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name='dueDate'
            className="input date"
            value={formData.dueDate}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default Task;
