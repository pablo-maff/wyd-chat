import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';
import Chat from './components/Chat';
import RegisterForm from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUserChats } from './redux/reducers/userChatsReducer';
import { useEffect } from 'react';
import { keepUserSessionAlive } from './redux/reducers/userAuthenticationReducer';
import { LocalStorageManager } from './utils/LocalStorageManager';

function PrivateRoute({ redirectPath = '/login' }) {
  const { user } = useSelector(state => state.userAuthentication)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initializeUserChats(user.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default function App() {
  const isAuthenticated = useSelector(state => state.userAuthentication)?.isAuthenticated
  const { getItem } = LocalStorageManager

  const dispatch = useDispatch()

  useEffect(() => {
    const userInStorage = getItem('user')

    if (!isAuthenticated && userInStorage) {
      dispatch(keepUserSessionAlive(userInStorage))
    }
  }, [getItem, isAuthenticated, dispatch])

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
