import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import LoginService from '../services/loginService';
import UsersService from '../services/usersService';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { setItem, getItem, removeItem } = useLocalStorage()

  const [user, setUser] = useState(() => getItem('user'))

  function loginUser(credentials) {
    return new Promise((resolve, reject) => {
      LoginService.login(credentials)
        .then(response => {
          setUser(response.data);
          setItem('user', JSON.stringify(response.data));
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function registerUser(userData) {
    return new Promise((resolve, reject) => {
      UsersService.register(userData)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function logoutUser() {
    setUser(null);
    removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};