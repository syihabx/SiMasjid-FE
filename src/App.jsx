import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

import Header from './components/layout/Header'
import Sidebar from './components/dashboard/Sidebar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import PengaturanPage from './pages/PengaturanPage'
import ProfilePage from './pages/ProfilePage'
import AccountPage from './pages/AccountPage'
import ProtectedRoute from './components/ProtectedRoute'
import DailyTaskCRUDPage from './pages/dashboard/DailyTaskCRUDPage'
import InventoryCRUDPage from './pages/dashboard/InventoryCRUDPage'

function App() {
  const { user } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  const handleLoginSuccess = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      {user && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}
      {user && <div className="lg:ml-64"></div>}
      <div className={user ? "lg:pl-64" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/pengaturan" element={<PengaturanPage />} />
            <Route 
              path="/daily-task" 
              element={<DailyTaskCRUDPage />} 
            />
            <Route 
              path="/inventory" 
              element={<InventoryCRUDPage />} 
            />
          </Route>
        </Routes>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
