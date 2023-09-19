import { createContext, useContext, useState } from 'react';
import ChatInstance from '../services/ChatInstance';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { setItem, getItem, removeItem } = useLocalStorage()

  const [user, setUser] = useState(() => getItem('user'))

  const loginUser = (userData) => {
    return new Promise((resolve, reject) => {
      ChatInstance.post('/login', userData)
        .then(response => {
          setUser(response.data);
          setItem('user', JSON.stringify(response.data));
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const logoutUser = () => {
    setUser(null);
    removeItem('user')
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};