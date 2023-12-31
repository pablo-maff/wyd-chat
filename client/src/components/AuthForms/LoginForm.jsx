import { useDispatch } from 'react-redux'
import { useField } from '../../hooks/useField'
import { loginUser } from '../../redux/reducers/userAuthenticationReducer'

export function LoginForm({ handleToggleForm }) {
  const username = useField('email')
  const password = useField('password')

  const dispatch = useDispatch()

  function handleLogin(event) {
    event.preventDefault()

    dispatch(loginUser({
      username: username.inputs.value,
      password: password.inputs.value
    }))
  }

  return (
    <>
      <form onSubmit={handleLogin} className='w-full mt-2' >
        <div className="mb-2">
          <label htmlFor="login-email" className="block mb-2 text-sm font-medium">
            <strong>
              <span>E-mail</span>
              <span>*</span>
            </strong>
          </label>
          <input
            id='login-email'
            name="username"
            aria-required="true"
            required
            {...username.inputs}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="login-password" className="block mb-2 text-sm font-medium">
            <strong>
              <span>Password</span>
              <span>*</span>
            </strong>
          </label>
          <input
            name="password"
            id='login-password'
            aria-required="true"
            required
            minLength={8}
            maxLength={12}
            {...password.inputs}
          />
        </div>
        <button
          type="submit"
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
        >
          Login
        </button>
      </form>
      <button
        onClick={handleToggleForm}
        className="w-full mt-2 border border-gray-500 bg-white py-2 rounded hover:bg-blue-600 hover:text-white focus:outline-none focus:ring focus:ring-blue-200"
      >
        Register
      </button>
    </>
  )
}