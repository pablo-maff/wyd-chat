import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/Main';
import { useState } from 'react';
import { Login } from './pages/Login';
import Chat from './components/Chat';

export default function App() {
  const [user, setUser] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate replace to="/chat" /> : <Navigate replace to="/login" />} />
        <Route path="/chat" element={<Main />} >
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}
