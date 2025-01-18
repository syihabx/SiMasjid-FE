import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const VerifyEmailPage = () => {
  const { token } = useParams()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { verifyEmail, resendVerificationEmail } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const verify = async () => {
      try {
        setLoading(true)
        await verifyEmail({ token })
        setSuccess('Email berhasil diverifikasi')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } catch (err) {
        setError(err.response?.data?.message || 'Gagal memverifikasi email')
      } finally {
        setLoading(false)
      }
    }
    
    if (token) {
      verify()
    }
  }, [token, navigate, verifyEmail])

  const handleResendEmail = async () => {
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      await resendVerificationEmail({ token })
      setSuccess('Email verifikasi telah dikirim ulang')
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengirim ulang email verifikasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verifikasi Email
          </h2>
        </div>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Memverifikasi email...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <div className="text-red-500 text-sm mb-4">{error}</div>
            <button
              onClick={handleResendEmail}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Memproses...' : 'Kirim Ulang Email Verifikasi'}
            </button>
          </div>
        )}

        {success && (
          <div className="text-center">
            <div className="text-green-500 text-sm mb-4">{success}</div>
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Kembali ke halaman login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
