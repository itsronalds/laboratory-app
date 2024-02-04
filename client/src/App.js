import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import PublicRoutes from './components/Public';
import PrivateRoutes from './components/Private';
import AdminRoutes from './components/Admin';
import { useAuthContext } from './contexts/AuthContext';

function App() {
  const { isAuth } = useAuthContext();

  return (
    <Router>
      {isAuth.auth === true && isAuth.role === 'admin' && <AdminRoutes />}

      {isAuth.auth === true && isAuth.role === 'employee' && <PrivateRoutes />}

      {isAuth.auth === false && isAuth.role === '' && <PublicRoutes />}
    </Router>
  );
}

export default App;
