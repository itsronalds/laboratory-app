import './ExamsForm.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from './../../../utils/axios';

const ExamsForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      examsPrice: '',
    },
  });

  const [exams, setExams] = useState([]);
  const [examsPrice, setExamsPrice] = useState('');

  const getExamsForCategory = async (examsCategory) => {
    try {
      const baseURL = `/private/getExamsForCategory.php?examsCategory=${examsCategory}`;
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, exams } = request.data;

      if (success === true) {
        return setExams(exams);
      }

      setExams([]);
      setExamsPrice('');
    } catch (err) {
      console.error(err);
    }
  };

  const addExams = async (data, e) => {
    try {
      const baseURL = '/private/addExams.php';
      const request = await axios({
        method: 'POST',
        data: JSON.stringify(data),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === false) {
        return alert(message);
      }

      if (success === true) {
        alert(message);

        e.target.reset();

        setExamsPrice('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const printPrice = (examsName) => {
    if (examsName.length > 0) {
      const value = exams.find((exams) => exams.examsName === examsName);

      return setExamsPrice(value.examsPrice);
    }

    setExamsPrice('');
  };

  const reset = () => {
    setExams([]);
    setExamsPrice('');
  };

  return (
    <div
      className="bg-gray-100 flex justify-center items-center"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <form
        className="bg-white w-full p-5 rounded shadow-sm md:w-96"
        onSubmit={handleSubmit(addExams)}
      >
        <h2 className="text-gray-900 text-2xl text-center">Examen médico</h2>

        <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <i className="fas fa-user text-sm text-gray-500"></i>

          <input
            style={{ width: 'calc(100% - 26px)' }}
            className="bg-transparent h-10 pl-3 outline-none text-sm placeholder-gray-500"
            type="text"
            placeholder="Nombre completo..."
            {...register('userFullname')}
          />
        </div>

        <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <i className="fas fa-id-card text-sm text-gray-500"></i>

          <input
            style={{ width: 'calc(100% - 26px)' }}
            className="bg-transparent h-10 pl-3 outline-none text-sm placeholder-gray-500"
            type="text"
            placeholder="Cédula..."
            {...register('userDni')}
          />
        </div>

        <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <i className="fas fa-envelope text-sm text-gray-500"></i>

          <input
            style={{ width: 'calc(100% - 26px)' }}
            className="bg-transparent h-10 pl-3 outline-none text-sm placeholder-gray-500"
            type="email"
            placeholder="Ingrese su email..."
            {...register('userEmail')}
          />
        </div>

        <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <i className="fas fa-vials text-sm text-gray-500"></i>

          <select
            style={{ width: 'calc(100% - 26px)' }}
            className="bg-transparent w-80 h-10 pl-1 outline-none text-sm text-gray-500"
            {...register('examsCategory')}
            onChange={(e) => getExamsForCategory(e.target.value)}
          >
            <option className="text-black">Categoria de examen...</option>
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

        <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <i className="fas fa-vial text-sm text-gray-500"></i>

          <select
            style={{ width: 'calc(100% - 26px)' }}
            className="bg-transparent w-80 h-10 pl-2 outline-none text-sm text-gray-500"
            {...register('examsName')}
            onChange={(e) => printPrice(e.target.value)}
          >
            <option className="text-black" value="">
              Tipo de examen...
            </option>
            {exams?.map((exams) => (
              <option
                key={exams.IDExams}
                className="text-black"
                value={exams.examsName}
              >
                {exams.examsName}
              </option>
            ))}
          </select>
        </div>

        {examsPrice !== '' && (
          <span className="text-3xl text-black font-semibold mb-4 inline-block text-center w-full">
            {examsPrice}$
          </span>
        )}

        <button
          className="bg-blue-500 w-full h-10 outline-none border-none rounded text-white text-sm"
          type="submit"
        >
          Registrar
        </button>

        <button
          className="bg-indigo-500 w-full h-10 mt-4 outline-none border-none rounded text-white text-sm"
          type="reset"
          onClick={reset}
        >
          Reiniciar
        </button>
      </form>
    </div>
  );
};

export default ExamsForm;
