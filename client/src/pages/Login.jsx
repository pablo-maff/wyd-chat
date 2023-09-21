import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './Register';

export function Login() {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate()

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/chat')
    }
  }, [user, navigate])

  function handleLogin(event) {
    event.preventDefault()

    loginUser({ username, password })
      .then(_ => navigate('/chat'))
      .catch(error => {
        console.error(error)
        //TODO: Notification here
      })
  }

  function handleShowRegisterForm(event) {
    event.preventDefault()

    setShowRegisterForm(!showRegisterForm)
  }

  return (
    <div className="min-h-screen  bg-blueChat-50">
      <header className="flex items-center justify-center p-4">
        <h1 className="text-3xl">Welcome to wyd chat!</h1>
      </header>
      {!showRegisterForm ?
        <div className="min-h-screen flex flex-col items-center justify-center pb-40">
          <div className="shadow-xl bg-blueChat-200 p-8 rounded-lg">
            <h3 className="text-xl mb-2">Login</h3>
            <div className="flex flex-col items-center w-60">
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(event) => setUserName(event.target.value)}
                  className="mb-2 p-2 rounded border bg-white border-gray-400 w-full"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  className="mb-4 p-2 rounded border bg-white border-gray-400 w-full"
                  required
                />
                <button
                  type="submit"
                  className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'
                >
                  Login
                </button>
              </form>
              <button
                onClick={handleShowRegisterForm}
                className="w-full mt-2 bg-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        : <RegisterForm handleShowRegisterForm={handleShowRegisterForm} />
      }
    </div>
  )
}