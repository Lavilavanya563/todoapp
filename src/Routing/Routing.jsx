// import React from 'react'
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Task from '../Components/Task/Task'
// import Main from '../Components/Main/Main'
// const Routing = () => {
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//         <Route path='/' element={<Main/>}/>
//         <Route path='/addtask' element={<Task/>}/>
//     </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default Routing

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Task from '../Components/Task/Task';
import Main from '../Components/Main/Main';
import Login from '../Components/Login/Login';
import { AuthProvider, useAuth } from '../AuthContext';

// ProtectedRoute logic
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Routing = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Main /></ProtectedRoute>} />
          <Route path="/addtask" element={<ProtectedRoute><Task /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routing;
