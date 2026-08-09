import { useState } from 'react'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={<Home/>}/>
       <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
