import './EmployeeLogIn.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from './../../../utils/axios';
import { useAuthContext } from './../../../contexts/AuthContext';

const EmployeeLogIn = () => {
  const { setIsAuth } = useAuthContext();
  const { register, handleSubmit } = useForm();
  const { push } = useHistory();

  const logIn = async (data) => {
    try {
      const baseURL = '/auth/private/employeeLogIn.php';
      const request = await axios({
        method: 'POST',
        data: JSON.stringify(data),
        url: baseURL,
      });
      const { success, auth, role, message, token } = request.data;

      if (success === false) {
        return alert(message);
      }

      if (success === true) {
        localStorage.setItem('token', token);

        push('/private/exams');

        setIsAuth({
          auth,
          role,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="bg-gray-100 p-10 rounded shadow-none text-center"
      onSubmit={handleSubmit(logIn)}
    >
      <h2 className="text-gray-900 text-2xl">Iniciar sesión</h2>

      <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
        <i className="fas fa-envelope text-sm text-gray-500"></i>

        <input
          className="bg-transparent w-64 h-10 pl-3 outline-none text-sm placeholder-gray-500"
          type="email"
          placeholder="Ingrese su email..."
          {...register('employeeEmail')}
        />
      </div>

      <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
        <i className="fas fa-unlock text-sm text-gray-500"></i>

        <input
          className="bg-transparent w-64 h-10 pl-3 outline-none text-sm placeholder-gray-500"
          type="password"
          placeholder="Ingrese su contraseña..."
          {...register('employeePassword')}
        />
      </div>

      <button
        className="bg-blue-500 w-72 h-10 text-white rounded"
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
};

export default EmployeeLogIn;
