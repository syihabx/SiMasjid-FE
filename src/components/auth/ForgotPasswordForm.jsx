import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { forgotPassword } from '../../store/authSlice'
import Button from '../UI/Button'

function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => {
        toast.success('Password reset email sent')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={onChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
