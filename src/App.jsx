import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './pages/Main';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        {/* <Route path='/chat' element={<Chat />} /> */}
        {/* <Route path="/login" element={<Login />} />  */}
      </Routes>
    </Router>
  );
}
