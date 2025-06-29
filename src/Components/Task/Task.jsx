import React, { useState } from 'react';
import { FiChevronLeft } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import './Task.css';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../AuthContext';

const Task = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    sharedWith: ""
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const sharedList = formData.sharedWith
        ? formData.sharedWith.split(',').map(email => email.trim())
        : [];

      await addDoc(collection(db, "tasks"), {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        owner: user.email,
        status: 'pending',
        sharedWith: sharedList
      });

      navigate("/");
    } catch (err) {
      alert("Error creating task");
      console.error(err);
    } finally {
      setLoading(false); 
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
          <input
            type="text"
            placeholder="Share with (emails, comma-separated)"
            name='sharedWith'
            className="input"
            value={formData.sharedWith}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Task;
