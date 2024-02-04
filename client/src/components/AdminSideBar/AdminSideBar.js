import './AdminSideBar.css';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from './../../contexts/AuthContext';

const AdminSideBar = ({ currentSection, setCurrentSection, adminData }) => {
  const { setIsAuth } = useAuthContext();

  const { push } = useHistory();

  const logOut = async () => {
    localStorage.removeItem('token');

    push('/');

    setIsAuth({
      auth: false,
      role: '',
    });
  };

  const formatFullname = (fullname) => {
    const space = fullname.indexOf(' ');

    return fullname.slice(0, space + 2);
  };

  return (
    <div className="bg-gradient-to-b from-indigo-600 to-blue-600 md:w-1/5 py-10 flex flex-col items-center">
      <h1 className="text-white text-xl font-semibold">Panel de control</h1>

      <img
        className="w-14 h-14 mt-10 rounded-full object-cover"
        src={adminData.adminAvatar}
        alt=""
      />
      <h3 className="mt-2 mb-1 text-white text-base font-medium">
        Bienvenido, {formatFullname(adminData.adminFullname)}.
      </h3>
      <span className="text-white text-xs font-light">
        Código: {adminData.adminCode}
      </span>

      <div className="w-full px-2 mt-10 flex flex-wrap md:flex-col">
        <div
          className={`${
            currentSection === 'exams' && 'bg-blue-500'
          } w-1/2 md:w-full py-2 pl-3 my-2 rounded-lg flex items-center cursor-pointer transition-all`}
          onClick={() => setCurrentSection('exams')}
        >
          <i className="mr-1 text-gray-50 text-sm fas fa-vial"></i>

          <span className="ml-1 text-white text-xs">Examenes</span>
        </div>

        <div
          className={`${
            currentSection === 'add exams' && 'bg-blue-500'
          } w-1/2 md:w-full py-2 pl-3 my-2 rounded-lg flex items-center cursor-pointer transition-all`}
          onClick={() => setCurrentSection('add exams')}
        >
          <i className="mr-1 text-gray-50 text-sm fas fa-envelope-open-text"></i>

          <span className="ml-1 text-white text-xs">Agregar examen</span>
        </div>

        <div
          className={`${
            currentSection === 'admins' && 'bg-blue-500'
          } w-1/2 md:w-full py-2 pl-3 my-2 rounded-lg flex items-center cursor-pointer transition-all`}
          onClick={() => setCurrentSection('admins')}
        >
          <i className="fas fa-users-cog mr-1 text-gray-50 text-sm"></i>

          <span className="ml-1 text-white text-xs">Administradores</span>
        </div>

        <div
          className={`${
            currentSection === 'employees' && 'bg-blue-500'
          } w-1/2 md:w-full py-2 pl-3 my-2 rounded-lg flex items-center cursor-pointer transition-all`}
          onClick={() => setCurrentSection('employees')}
        >
          <i className="mr-1 text-gray-50 text-sm fas fa-user-tie"></i>

          <span className="ml-1 text-white text-xs">Empleados</span>
        </div>

        {/*
            <div className="w-1/2 md:w-full py-2 pl-3 my-2 rounded-lg flex items-center cursor-pointer transition-all">
          <i className="mr-1 text-gray-50 text-sm fas fa-users"></i>

          <span className="ml-1 text-white text-xs">Usuarios</span>
        </div>
        */}

        <div
          className={`${
            currentSection === 'add staff' && 'bg-blue-500'
          } w-1/2 md:w-full py-2 pl-3 my-2 rounded-lg flex items-center cursor-pointer transition-all`}
          onClick={() => setCurrentSection('add staff')}
        >
          <i className="mr-1 text-gray-50 text-sm far fa-address-card"></i>

          <span className="ml-1 text-white text-xs">Agregar personal</span>
        </div>

        <div
          className="w-1/2 md:w-full py-2 pl-3 my-2 flex items-center cursor-pointer"
          onClick={logOut}
        >
          <i className="mr-1 text-gray-50 text-sm fas fa-sign-out-alt"></i>

          <span className="ml-1 text-white text-xs">Salir del sistema</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
