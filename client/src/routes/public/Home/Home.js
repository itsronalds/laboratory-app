import './Home.css';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const { push } = useHistory();

  return (
    <div className="bg-gray-100 p-10 rounded shadow-none text-center">
      <h2 className="text-gray-900 text-2xl">Bienvenido, elija su rol</h2>

      <button
        className="bg-gradient-to-r from-indigo-500 to-blue-500 w-64 h-10 my-5 rounded text-white block"
        onClick={() => push('/admin/login')}
      >
        Administrador
      </button>

      <button
        className="bg-gradient-to-r from-indigo-500 to-blue-500 w-64 h-10 my-5 rounded text-white block"
        onClick={() => push('/login')}
      >
        Empleado
      </button>
    </div>
  );
};

export default Home;
