import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import AdminSolveQuery from './pages/AdminSolveQuery'

export default function App() {
  return (
    <>
    <div className='app'>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={Dashboard} />} />
          <Route
            path="/handleQuery"
            element={<ProtectedRoute Component={AdminSolveQuery} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}
