import React from 'react'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { Route, Routes } from 'react-router-dom'
 import { ToastContainer, toast } from 'react-toastify';
// import getCurrentUser from './customHooks/getCurrentUser.js';

export const serverUrl = "http://localhost:8000";

function App () {
  // getCurrentUser();
  return (
    <>
           <ToastContainer />
      <Routes>
      <Route path="/" element={<Home/>}/>
       <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
