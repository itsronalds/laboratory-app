import './AdminTable.css';
import { useState, lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import UpdateModal from './../UpdateModal/UpdateModal';
import axios from './../../utils/axios';
const ExamsTable = lazy(() => import('./ExamsTable'));
const AdminList = lazy(() => import('./AdminList'));
const EmployeeList = lazy(() => import('./EmployeeList'));

const AdminTable = ({ content, data, updateList }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      updatedIDAdmin: 0,
      updatedAdminFullname: '',
      updatedAdminDni: '',
      updatedAdminEmail: '',
      updatedIDEmployee: 0,
      updatedEmployeeFullname: '',
      updatedEmployeeDni: '',
      updatedEmployeeEmail: '',
      updatedEmployeeAddress: '',
      updatedIDPeopleExams: 0,
      updatedPeopleFullname: '',
      updatedPeopleDni: '',
      updatedPeopleEmail: '',
    },
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const updateAdmin = async (data) => {
    const {
      updatedIDAdmin: IDAdmin,
      updatedAdminFullname: adminFullname,
      updatedAdminDni: adminDni,
      updatedAdminEmail: adminEmail,
      updatedAdminPassword: adminPassword,
    } = data;

    const updatedAdmin = {
      IDAdmin,
      adminFullname,
      adminDni,
      adminEmail,
      adminPassword,
    };

    try {
      const baseURL = '/admin/updateAdmin.php';
      const request = await axios({
        method: 'PUT',
        data: JSON.stringify(updatedAdmin),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, newAdmin } = request.data;

      if (success === true) {
        updateList((state) =>
          state.map((admin) => {
            if (admin.IDAdmin === IDAdmin) {
              newAdmin.adminCode = admin.adminCode;
              newAdmin.adminAvatar = admin.adminAvatar;
              newAdmin.adminCreatedAt = admin.adminCreatedAt;

              return newAdmin;
            }

            return admin;
          })
        );

        setShowUpdateModal(false);

        alert('Administrador actualizado con exito!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAdmin = async (IDAdmin) => {
    try {
      const baseURL = `/admin/removeAdmin.php?id=${IDAdmin}`;
      const request = await axios({
        method: 'DELETE',
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === true) {
        updateList((state) =>
          state.filter((admin) => admin.IDAdmin !== IDAdmin)
        );

        alert(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const adminToUpdateFunc = (admin) => {
    const { IDAdmin, adminFullname, adminDni, adminEmail } = admin;

    reset({
      updatedIDAdmin: IDAdmin,
      updatedAdminFullname: adminFullname,
      updatedAdminDni: adminDni,
      updatedAdminEmail: adminEmail,
    });

    setShowUpdateModal(true);
  };

  const updateEmployee = async (data) => {
    try {
      const {
        updatedIDEmployee: IDEmployee,
        updatedEmployeeFullname: employeeFullname,
        updatedEmployeeDni: employeeDni,
        updatedEmployeeEmail: employeeEmail,
        updatedEmployeePassword: employeePassword,
        updatedEmployeeAddress: employeeAddress,
      } = data;

      const updatedEmployee = {
        IDEmployee,
        employeeFullname,
        employeeDni,
        employeeEmail,
        employeePassword,
        employeeAddress,
      };

      try {
        const baseURL = '/admin/updateEmployee.php';
        const request = await axios({
          method: 'PUT',
          data: JSON.stringify(updatedEmployee),
          url: baseURL,
          headers: {
            'X-Access-Token': localStorage.getItem('token'),
          },
        });
        const { success, message } = request.data;

        if (success === true) {
          updateList((state) =>
            state.map((employee) => {
              if (employee.IDEmployee === IDEmployee) {
                updatedEmployee.employeeCode = employee.employeeCode;
                updatedEmployee.employeePassword = '';
                updatedEmployee.employeeAvatar = employee.employeeAvatar;
                updatedEmployee.employeeCreatedAt = employee.employeeCreatedAt;

                return updatedEmployee;
              }

              return employee;
            })
          );

          setShowUpdateModal(false);

          alert(message);
        }
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const employeeToUpdateFunc = (employee) => {
    const {
      IDEmployee,
      employeeFullname,
      employeeDni,
      employeeEmail,
      employeeAddress,
    } = employee;

    reset({
      updatedIDEmployee: IDEmployee,
      updatedEmployeeFullname: employeeFullname,
      updatedEmployeeDni: employeeDni,
      updatedEmployeeEmail: employeeEmail,
      updatedEmployeeAddress: employeeAddress,
    });

    setShowUpdateModal(true);
  };

  const deleteEmployee = async (IDEmployee) => {
    try {
      const baseURL = `/admin/removeEmployee.php?id=${IDEmployee}`;
      const request = await axios({
        method: 'DELETE',
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === true) {
        updateList((state) =>
          state.filter((employee) => employee.IDEmployee !== IDEmployee)
        );

        alert(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateModal = () => setShowUpdateModal(!showUpdateModal);

  // Exams logic
  const peopleExamsToUpdateFunc = (peopleExams) => {
    const { IDPeopleExams, peopleFullname, peopleDni, peopleEmail } =
      peopleExams;

    reset({
      updatedIDPeopleExams: IDPeopleExams,
      updatedPeopleFullname: peopleFullname,
      updatedPeopleDni: peopleDni,
      updatedPeopleEmail: peopleEmail,
    });

    setShowUpdateModal(true);
  };

  const updatePeopleExams = async (data) => {
    const {
      updatedIDPeopleExams,
      updatedPeopleFullname,
      updatedPeopleDni,
      updatedPeopleEmail,
    } = data;
    const updatedPeopleExams = {
      IDPeopleExams: updatedIDPeopleExams,
      peopleFullname: updatedPeopleFullname,
      peopleDni: updatedPeopleDni,
      peopleEmail: updatedPeopleEmail,
    };

    try {
      const baseURL = '/admin/updatePeopleExams.php';
      const request = await axios({
        method: 'PUT',
        data: JSON.stringify(updatedPeopleExams),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === true) {
        updateList((state) => {
          const clone = state;
          const index = clone.findIndex(
            (peopleExams) =>
              peopleExams.IDPeopleExams === data.updatedIDPeopleExams
          );

          clone[index].peopleFullname = updatedPeopleFullname;
          clone[index].peopleDni = updatedPeopleDni;
          clone[index].peopleEmail = updatedPeopleEmail;

          return clone;
        });

        alert(message);

        setShowUpdateModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deletePeopleExams = async (IDPeopleExams) => {
    try {
      const baseURL = `/admin/removePeopleExams.php?id=${IDPeopleExams}`;
      const request = await axios({
        method: 'DELETE',
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      console.log(request.data);
      const { success, message } = request.data;

      if (success === true) {
        updateList((state) =>
          state.filter(
            (peopleExams) => peopleExams.IDPeopleExams !== IDPeopleExams
          )
        );

        alert(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {showUpdateModal === true && (
        <UpdateModal
          toUpdate={content}
          {...{
            handleUpdateModal,
            register,
            handleSubmit,
          }}
          updateFunc={
            content === 'admins'
              ? updateAdmin
              : content === 'employees'
              ? updateEmployee
              : content === 'exams'
              ? updatePeopleExams
              : null
          }
        />
      )}

      <h2 className="font-semibold text-lg text-blue-500">
        {content === 'exams' && 'Sección de examenes'}
        {content === 'admins' && 'Lista de administradores'}
        {content === 'employees' && 'Lista de empleados'}
      </h2>

      {content === 'exams' && (
        <div className="mt-5">
          <h3 className="font-semibold text-base text-blue-500">Listado</h3>
        </div>
      )}

      {content === 'exams' && (
        <Suspense fallback={<div>Loading...</div>}>
          <ExamsTable
            peopleExams={data}
            {...{ peopleExamsToUpdateFunc, deletePeopleExams }}
          />
        </Suspense>
      )}
      {content === 'admins' && (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminList admins={data} {...{ adminToUpdateFunc, deleteAdmin }} />
        </Suspense>
      )}
      {content === 'employees' && (
        <Suspense fallback={<div>Loading...</div>}>
          <EmployeeList
            employees={data}
            {...{ employeeToUpdateFunc, deleteEmployee }}
          />
        </Suspense>
      )}
    </>
  );
};

export default AdminTable;
