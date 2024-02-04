import './Header.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from './../../contexts/AuthContext';

const Header = ({ mode }) => {
  const { setIsAuth } = useAuthContext();

  const logOut = async () => {
    localStorage.removeItem('token');

    setIsAuth({
      auth: false,
      role: '',
    });
  };

  return (
    <>
      {mode === 'public' && (
        <header className="absolute w-full px-16 py-4">
          <h1 className="text-xl text-white">Laboratorio Médico</h1>
        </header>
      )}

      {mode === 'private' && (
        <header className="bg-gradient-to-b from-indigo-600 to-blue-600 px-5 md:px-16 py-4 flex items-center justify-center md:justify-between">
          <h1 className="hidden md:block md:text-lg text-white">
            Laboratorio Médico
          </h1>

          <nav className="flex">
            <li className="list-none px-2 text-xs md:text-sm text-white">
              <Link to="/private/exams">Formulario</Link>
            </li>

            <li className="list-none px-2 text-xs md:text-sm text-white">
              <Link to="/private/results">Resultados</Link>
            </li>

            <li className="list-none px-2 text-xs md:text-sm text-white">
              <Link to="/private/payments">Pagos</Link>
            </li>

            <li className="list-none pl-2 text-xs md:text-sm text-white">
              <Link to="/" onClick={logOut}>
                Salir
              </Link>
            </li>
          </nav>
        </header>
      )}
    </>
  );
};

export default Header;
