import './AddStaff.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from './../../utils/axios';
import AdminForm from './AdminForm';
import EmployeeForm from './EmployeeForm';

const AddStaff = () => {
  const { register, handleSubmit } = useForm();

  const [currentForm, setCurrentForm] = useState('admin');

  const addAdmin = async (data, e) => {
    const { adminFullname, adminDni, adminEmail, adminPassword, adminAvatar } =
      data;
    const formData = new FormData();

    formData.append('adminFullname', adminFullname);
    formData.append('adminDni', adminDni);
    formData.append('adminEmail', adminEmail);
    formData.append('adminPassword', adminPassword);
    formData.append('adminAvatar', adminAvatar[0]);

    try {
      const baseURL = '/admin/addAdmin.php';
      const request = await axios({
        method: 'POST',
        data: JSON.stringify(formData),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === false) return alert(message);

      if (success === true) {
        alert(message);

        e.target.reset();

        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addEmployee = async (data, e) => {
    const {
      employeeFullname,
      employeeDni,
      employeeEmail,
      employeePassword,
      employeeAddress,
      employeeAvatar,
    } = data;
    const formData = new FormData();

    formData.append('employeeFullname', employeeFullname);
    formData.append('employeeDni', employeeDni);
    formData.append('employeeEmail', employeeEmail);
    formData.append('employeePassword', employeePassword);
    formData.append('employeeAddress', employeeAddress);
    formData.append('employeeAvatar', employeeAvatar[0]);

    try {
      const baseURL = '/admin/addEmployee.php';
      const request = await axios({
        method: 'POST',
        data: JSON.stringify(formData),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === false) return alert(message);

      if (success === true) {
        alert(message);

        e.target.reset();

        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h2 className="font-semibold text-lg text-blue-500">
        Sección de agregar personal
      </h2>

      <div className="mt-5 flex flex-col items-center">
        {/* Titles */}
        <div>
          <span
            className="mr-3 text-blue-500 font-semibold cursor-pointer"
            onClick={() => setCurrentForm('admin')}
          >
            Administrador
          </span>

          <span
            className="ml-3 text-blue-500 font-semibold cursor-pointer"
            onClick={() => setCurrentForm('employee')}
          >
            Empleado
          </span>
        </div>

        {/* Line */}
        <div className="bg-gray-300 w-full h-0.5 mt-5">
          <div
            className="bg-blue-400 w-1/2 h-0.5 ml-0 transition-all"
            style={{ marginLeft: currentForm !== 'admin' && '50%' }}
          ></div>
        </div>
      </div>

      {currentForm === 'admin' && (
        <AdminForm {...{ register, handleSubmit, addAdmin }} />
      )}

      {currentForm === 'employee' && (
        <EmployeeForm {...{ register, handleSubmit, addEmployee }} />
      )}
    </>
  );
};

export default AddStaff;
