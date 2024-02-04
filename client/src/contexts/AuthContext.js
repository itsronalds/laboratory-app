import { createContext, useContext, useState, useEffect } from 'react';
import axios from './../utils/axios';

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState({
    auth: false,
    role: '',
  });

  useEffect(() => sessionVerify(), []);

  const sessionVerify = async () => {
    try {
      const baseURL = '/auth/sessionVerify.php';
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, auth, role } = request.data;

      if (success === true) {
        setIsAuth({
          auth,
          role,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const value = {
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);
