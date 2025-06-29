import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Task from '../Components/Task/Task'
import Main from '../Components/Main/Main'
const Routing = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/addtask' element={<Task/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing