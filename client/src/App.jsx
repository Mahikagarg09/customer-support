import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <>
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}
