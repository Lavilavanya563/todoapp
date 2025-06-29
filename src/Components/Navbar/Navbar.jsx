import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../AuthContext'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'; 
const Navbar = () => {
  const { user } = useAuth();
  const messages = [
    'Good afternoon 👋',
    'Unlock your productivity potential 🔓',
    'You got this 💪',
    'Stay focused 🎯',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert('Logout failed');
      console.error(error);
    }
  };

  return (
    <div className="navin">
      <div className="in">
        <div className="nav-left">
          <h1>👋 Hello {user?.displayName?.split(' ')[0]}</h1>
          <p>{messages[index]}</p>
        </div>

        <div className="nav-right">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="profile" className="profile-img" />
          ) : (
            <FaUserCircle size={40} className="user" />
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
