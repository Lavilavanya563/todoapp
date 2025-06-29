import React from 'react'
import './Navbar.css'
import { FaUserCircle } from "react-icons/fa";
import  { useEffect, useState } from 'react'
const Navbar = () => {
      const messages = [
        "Good afternoon 👋",
        "Unlock your productivity potential 🔓",
        "You got this 💪",
        "Stay focused 🎯",
      ];
       const [index, setIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % messages.length);
        }, 3000); // change every 2.5 seconds
    
        return () => clearInterval(interval);
      }, [messages.length]);
  return (
    <>
     <div className="navin">
         <div className="in">
         <div className="nav-left">
            <h1>👋Hello</h1>
            <p>  {messages[index]}</p>
        </div>
        
            <FaUserCircle size={50} className='user' title='USER'/>
        
        </div>
     </div>
        </>
  )
}

export default Navbar