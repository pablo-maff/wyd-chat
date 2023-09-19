import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';
import Chat from './components/Chat';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ redirectPath = '/login' }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Navigate to={'/login'} />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />} >
          <Route path='/chat' element={<Main />} >
            <Route path='/chat/:id' element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </Router >
  )
}
