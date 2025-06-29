import React from 'react';
import './Login.css';
import { signInWithPopup, provider, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to Task Manager</h2>
        <button onClick={loginWithGoogle} className="google-btn">
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
