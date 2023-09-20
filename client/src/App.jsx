import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';
import Chat from './components/Chat';
import { useAuth } from './context/AuthContext';
import RegisterForm from './pages/Register';
import { useDispatch } from 'react-redux';
import { initializeUserChats } from './redux/reducers/userChatsReducer';

function PrivateRoute({ redirectPath = '/login' }) {
  const { user } = useAuth()
  const dispatch = useDispatch()

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  dispatch(initializeUserChats(user.id))

  return <Outlet />
}

export default function App() {
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
