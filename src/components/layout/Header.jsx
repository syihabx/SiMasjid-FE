import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { logout } from '../../store/authSlice'
import ProfileDropdown from './ProfileDropdown'
import Modal from '../Modal'
import LoginPage from '../../pages/auth/LoginPage'
import RegisterPage from '../../pages/auth/RegisterPage'

export default function Header({ onToggleSidebar }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {user && (
              <button 
                onClick={onToggleSidebar}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 mr-2"
              >
                <span className="material-icons">menu</span>
              </button>
            )}
            <div 
              onClick={() => user ? navigate('/dashboard') : navigate('/')}
              className="text-xl font-bold text-gray-800 cursor-pointer"
            >
              SIMASJID
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center">
                <ProfileDropdown />
              </div>
            ) : (
              <>
                <Button 
                  variant="primary"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Register
                </Button>

                {showLoginModal && (
                  <Modal 
                    isOpen={showLoginModal} 
                    onClose={() => setShowLoginModal(false)}
                  >
                    <LoginPage 
                      onSuccess={() => {
                        setShowLoginModal(false)
                        navigate('/dashboard')
                      }}
                    />
                  </Modal>
                )}

                {showRegisterModal && (
                  <Modal 
                    isOpen={showRegisterModal} 
                    onClose={() => setShowRegisterModal(false)}
                  >
                    <RegisterPage 
                      onSuccess={() => setShowRegisterModal(false)}
                      onClose={() => setShowRegisterModal(false)}
                    />
                  </Modal>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
