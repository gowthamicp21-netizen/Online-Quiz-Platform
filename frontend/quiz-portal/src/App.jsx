import { useState } from 'react'
import Home from './pages/Home';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import AddCategory from './pages/AddCategory';
import AddQuestion from './pages/AddQuestion';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import ForgotPassword from './pages/ForgotPassword';
import QuestionByCategory from './pages/QuestionsByCategory';
import UpdateQuestion from './pages/UpdateQuestion';
import AddQuiz from './pages/AddQuiz';

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>}/>
       <Route path="/home" element={<Home/>}/>
       <Route path="/forgot-password" element={<ForgotPassword/>}/>
       <Route path="/adminDashboard" element={<AdminDashboard/>}/>
       <Route path="/addCategory" element={<AddCategory/>}/>
       <Route path="addQuestion" element={<AddQuestion/>}/>
       <Route path="/category/:categoryId" element={<QuestionByCategory/>}/>
       <Route path="/updateQuestion/:questionId" element={<UpdateQuestion/>}/>
       <Route path="/addQuiz" element={<AddQuiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
