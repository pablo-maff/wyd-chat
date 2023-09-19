import { useState } from 'react'
import ChatInstance from '../services/ChatInstance'

export function Login() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(event) {
    event.preventDefault()

    ChatInstance.post('/login', { username, password })
      .then(response => {
        console.log('response', response.data)
      })
  }

  return (
    <div className="min-h-screen  bg-blueChat-50">
      <header className="flex items-center justify-center p-4">
        <h1 className="text-3xl">Welcome to wyd chat!</h1>
      </header>
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
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                className="mb-4 p-2 rounded border bg-white border-gray-400 w-full"
              />
              <div className='w-full flex justify-end ' >
                <div className='bg-blueChat-400 w-20 h-10 flex justify-center items-center rounded-lg'>
                  <button type="submit" className='text-white' >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}