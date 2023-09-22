import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';
import Chat from './components/Chat';
import RegisterForm from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUserChats } from './redux/reducers/userChatsReducer';
import SocketClient from './utils/SocketClient';
import { useEffect } from 'react';
import { keepUserSessionAlive } from './redux/reducers/userAuthenticationReducer';

function PrivateRoute({ redirectPath = '/login' }) {
  const { user, isAuthenticated } = useSelector(state => state.userAuthentication)

  const dispatch = useDispatch()

  // const socket = new SocketClient()

  // useEffect(() => {
  //   socket.connect()
  //   console.log('Connected to socket!');

  //   return () => {
  //     socket.disconnect()
  //     console.log('Disconnected from socket!');

  //   }
  // }, [])

  useEffect(() => {
    if (!user) {
      console.log('keep session ALIVE!');
      dispatch(keepUserSessionAlive())
    }
  }, [dispatch, user])

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  console.log('sneakyy', user);

  dispatch(initializeUserChats(user.id))

  return <Outlet />
}

export default function App() {
  const { user, isAuthenticated } = useSelector(state => state.userAuthentication)

  const dispatch = useDispatch()



  return (
    <Router>
      <Routes>
        <Route path='*' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route element={<PrivateRoute />} >
          <Route path='/chat' element={<Main />} >
            <Route path='/chat/:id' element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </Router >
  )
}
