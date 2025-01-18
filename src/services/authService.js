import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://backend.simasjid.com/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Forgot password
const forgotPassword = async (email) => {
  const response = await axios.post(API_URL + 'forgot-password', { email })
  return response.data
}

// Reset password
const resetPassword = async (resetData) => {
  const response = await axios.post(API_URL + 'reset-password', resetData)
  return response.data
}

const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
}

export default authService
