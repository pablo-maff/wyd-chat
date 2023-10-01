import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/AuthForms/RegisterForm';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header/Header';
import { LoginForm } from '../components/AuthForms/LoginForm';

export function Login() {
  const [toggleForm, setToggleForm] = useState(false)

  const navigate = useNavigate()

  const { user, isAuthenticated } = useSelector(state => state.userAuthentication)

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate('/chat')
    }
  }, [user, isAuthenticated, navigate])

  function handleToggleForm(event) {
    event.preventDefault()

    setToggleForm(!toggleForm)
  }

  return (
    <div className="min-h-screen bg-blueChat-100">
      <Header />
      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="min-w-[300px] shadow-xl bg-blueChat-200 p-8 rounded-lg mb-4">
          <h3 className="text-2xl mb-4 font-semibold text-center">
            {!toggleForm ? 'Login' : 'Register'}
          </h3>
          {!toggleForm ?
            <LoginForm handleToggleForm={handleToggleForm} />
            : <RegisterForm handleToggleForm={handleToggleForm} />
          }
        </div>
      </div>
    </div>
  )
}