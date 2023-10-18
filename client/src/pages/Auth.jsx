import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/AuthForms/RegisterForm';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { LoginForm } from '../components/AuthForms/LoginForm';

export function Auth() {
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
    <div className="bg-blur min-h-screen">
      <div className='blur-overlay min-h-screen'>
        <Header />
        <div className="mt-8 flex flex-col items-center justify-center">
          <fieldset className="min-w-[350px] shadow-xl p-8 rounded-lg mb-4 bg-blueChat-50 relative">
            <legend className="font-semibold absolute -top-4 bg-blueChat-200 p-1 px-2 rounded-md">
              {!toggleForm ? 'Login' : 'Register'}
            </legend>
            {!toggleForm ?
              <LoginForm handleToggleForm={handleToggleForm} />
              : <RegisterForm handleToggleForm={handleToggleForm} />
            }
          </fieldset>
        </div>
      </div>
    </div>
  )
}