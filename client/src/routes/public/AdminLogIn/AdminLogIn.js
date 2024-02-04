import './AdminLogIn.css';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from './../../../utils/axios';
import { useAuthContext } from './../../../contexts/AuthContext';

const AdminLogIn = () => {
  const { setIsAuth } = useAuthContext();

  const { register, handleSubmit } = useForm();
  const push = useHistory().push;

  const logIn = async (data) => {
    try {
      const baseURL = '/auth/admin/adminLogIn.php';
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

        push('/admin/dashboard');

        setIsAuth({
          auth,
          role,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="px-2 flex flex-col justify-center items-center">
        <h1 className="text-gray-900 text-xl sm:text-2xl font-semibold">
          Administradores
        </h1>
        <span className="mt-2 text-xs text-center">
          Apartado exclusivo para ingresar al sistema, solo administradores
        </span>

        <div className="mt-5 flex items-center text-center">
          <div className="adminLogIn__line bg-gray-300 h-px"></div>
          <span className="text-gray-500 text-xs mx-2">
            Número limitados de intentos
          </span>
          <div className="adminLogIn__line bg-gray-300 h-px"></div>
        </div>

        <form
          className="w-full max-w-21.51 mt-5"
          onSubmit={handleSubmit(logIn)}
        >
          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Email:</label>
            <input
              className="w-full h-10 sm:h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="email"
              placeholder="Ingrese su email..."
              {...register('adminEmail')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Password:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="password"
              placeholder="Ingrese su contraseña..."
              {...register('adminPassword')}
            />
          </div>

          <button
            className="bg-blue-500 w-full h-10 rounded-3xl text-xs text-white"
            type="submit"
          >
            Entrar
          </button>
        </form>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        <span style={{ marginTop: '30px', fontSize: '14px' }}>
          Nota: admin@gmail.com, contraseña: 12345678910
        </span>
>>>>>>> 9e224eb (First commit)
=======
>>>>>>> e288c31fa5a7abfe925fa9943d67a3a4cec5d291
=======
>>>>>>> e288c31fa5a7abfe925fa9943d67a3a4cec5d291
      </div>
    </div>
  );
};

export default AdminLogIn;
