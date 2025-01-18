import { useSelector, useDispatch } from 'react-redux'
import { 
  setCredentials, 
  logout,
  setEmailVerified 
} from '../store/authSlice'
import authService from '../services/authService'

const useAuth = () => {
  const dispatch = useDispatch()
  const { user, token, isEmailVerified } = useSelector(state => state.auth)

  const loginUser = async (credentials) => {
    try {
      const userData = await authService.login(credentials)
      dispatch(setCredentials(userData))
      return userData
    } catch (error) {
      throw error
    }
  }

  const registerUser = async (userData) => {
    try {
      const response = await authService.register(userData)
      return response
    } catch (error) {
      throw error
    }
  }

  const logoutUser = () => {
    authService.logout()
    dispatch(logout())
  }

  const verifyUserEmail = async (token) => {
    try {
      const response = await authService.verifyEmail(token)
      dispatch(setEmailVerified(true))
      return response
    } catch (error) {
      throw error
    }
  }

  const resendVerification = async (email) => {
    try {
      const response = await authService.resendVerificationEmail(email)
      return response
    } catch (error) {
      throw error
    }
  }

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email)
      return response
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (resetData) => {
    try {
      const response = await authService.resetPassword(resetData)
      return response
    } catch (error) {
      throw error
    }
  }

  return {
    user,
    token,
    isEmailVerified,
    loginUser,
    registerUser,
    logoutUser,
    verifyUserEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
  }
}

export default useAuth
