import './AddExams.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from './../../utils/axios';
import UpdateModal from './../UpdateModal/UpdateModal';

const AddExams = () => {
  const [exams, setExams] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      updatedIDExams: 0,
      updatedExamsName: '',
      updatedExamsCategory: '',
      updatedExamsPrice: 0,
      updatedExamsCreatedAt: '',
    },
  });

  useEffect(() => getExams(), []);

  const getExams = async () => {
    try {
      const baseURL = '/admin/getExams.php';
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, exams } = request.data;

      if (success === true) {
        setExams(exams);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addExams = async (data, e) => {
    try {
      const baseURL = '/admin/addExams.php';
      const request = await axios({
        method: 'POST',
        data: JSON.stringify(data),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, newExams, message } = request.data;

      if (success === false) {
        return alert(message);
      }

      if (success === true) {
        setExams((state) => state.concat(newExams));

        alert(message);

        e.target.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateExams = async (data) => {
    // Obtenemos los datos actualizados y les damos un alias
    const {
      updatedIDExams: IDExams,
      updatedExamsName: examsName,
      updatedExamsCategory: examsCategory,
      updatedExamsPrice: examsPrice,
      updatedExamsCreatedAt: examsCreatedAt,
    } = data;

    // Obtenemos los datos previos antes de actualizar
    const updatedExams = {
      IDExams,
      examsName,
      examsCategory,
      examsPrice,
      examsCreatedAt,
    };

    try {
      const baseURL = '/admin/updateExams.php';
      const request = await axios({
        method: 'PUT',
        data: JSON.stringify(updatedExams),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, updatedExams: newExams, message } = request.data;

      if (success === false) {
        return alert(message);
      }

      if (success === true) {
        setExams((state) =>
          state.map((exams) =>
            exams.IDExams === newExams.IDExams ? (exams = newExams) : exams
          )
        );

        alert(message);

        setShowUpdateModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeExams = async (IDExams) => {
    try {
      const baseURL = `/admin/removeExams.php?id=${IDExams}`;
      const request = await axios({
        method: 'delete',
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === true) {
        setExams((state) => state.filter((exams) => exams.IDExams !== IDExams));

        alert(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const examsToUpdateFunc = (exams) => {
    const { IDExams, examsName, examsCategory, examsPrice, examsCreatedAt } =
      exams;

    // Actualizamos los default values preestablecidos anteriormente con el hook useForm
    reset({
      updatedIDExams: IDExams,
      updatedExamsName: examsName,
      updatedExamsCategory: examsCategory,
      updatedExamsPrice: examsPrice,
      updatedExamsCreatedAt: examsCreatedAt,
    });

    setShowUpdateModal(true);
  };

  const handleUpdateModal = () => setShowUpdateModal(!showUpdateModal);

  return (
    <>
      {/* Update modal component */}
      {showUpdateModal === true && (
        <UpdateModal
          toUpdate="add exams"
          {...{
            handleUpdateModal,
            register,
            handleSubmit,
          }}
          updateFunc={updateExams}
        />
      )}

      <div className="overflow-y-auto">
        <h2 className="font-semibold text-lg text-blue-500">
          Sección de agregar examenes
        </h2>

        <form className="mt-5" onSubmit={handleSubmit(addExams)}>
          <h3 className="mb-5 font-semibold text-base text-blue-500">
            Formulario
          </h3>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Nombre de examen:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('examsName')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Categoria:
            </label>
            <select
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm text-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              {...register('examsCategory')}
            >
              <option>Seleccione...</option>
              <option
                className="text-black"
                value="Analisis de fluidos corporales"
              >
                Analisis de fluidos corporales
              </option>
              <option
                className="text-black"
                value="Pruebas de diagnostico por imagenes"
              >
                Pruebas de diagnostico por imagenes
              </option>
              <option className="text-black" value="Examenes de segundo nivel">
                Examenes de segundo nivel
              </option>
            </select>
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Precio:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="number"
              placeholder="Ingrese..."
              {...register('examsPrice')}
            />
          </div>

          <button
            className="bg-blue-500 w-full h-10 outline-none border-none rounded-3xl text-white text-sm"
            type="submit"
          >
            Agregar
          </button>
        </form>

        <div className="mt-5">
          <h3 className="font-semibold text-base text-blue-500">Listado</h3>

          <div className="mt-5 overflow-auto">
            <div className="addExam__tableHeader bg-blue-500 rounded flex text-white">
              <span className="w-32 lg:flex-1 py-3 text-center text-xs inline-block">
                Código
              </span>

              <span className="w-32 lg:flex-1 py-3 text-center text-xs inline-block">
                Nombre de examen
              </span>

              <span className="w-32 lg:flex-1 py-3 text-center text-xs inline-block">
                Categoría
              </span>

              <span className="w-32 lg:flex-1 py-3 text-center text-xs inline-block">
                Precio
              </span>

              <span className="w-32 lg:flex-1 py-3 text-center text-xs inline-block">
                Fecha de creación
              </span>

              <span className="w-32 lg:flex-1 py-3 text-center text-xs inline-block">
                Acciones
              </span>
            </div>

            <div className="addExam__tableBody mt-5 text-gray-900">
              {exams.map((exams) => (
                <div className="flex" key={exams.IDExams}>
                  <span className="w-32 lg:flex-1 h-12 text-center text-xs flex items-center justify-center">
                    {exams.IDExams}
                  </span>

                  <span className="w-32 lg:flex-1 h-12 text-center text-xs flex items-center justify-center">
                    {exams.examsName}
                  </span>

                  <span className="w-32 lg:flex-1 h-12 text-center text-xs flex items-center justify-center">
                    {exams.examsCategory}
                  </span>

                  <span className="w-32 lg:flex-1 h-12 text-center text-xs flex items-center justify-center">
                    {exams.examsPrice}$
                  </span>

                  <span className="w-32 lg:flex-1 h-12 text-center text-xs flex items-center justify-center">
                    {exams.examsCreatedAt}
                  </span>

                  <span className="w-32 lg:flex-1 h-12 flex items-center justify-center">
                    <button
                      className="bg-blue-500 p-1 mr-1 outline-none border-none rounded text-white text-xs"
                      onClick={() => examsToUpdateFunc(exams)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="bg-red-500 p-1 ml-1 outline-none border-none rounded text-white text-xs"
                      onClick={() => removeExams(exams.IDExams)}
                    >
                      Eliminar
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExams;
