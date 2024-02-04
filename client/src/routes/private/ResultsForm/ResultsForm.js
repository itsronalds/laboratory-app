import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from './../../../utils/axios';

const ResultsForm = () => {
  const { register, handleSubmit } = useForm();
  const [exams, setExams] = useState([]);

  useEffect(() => getExams(), []);

  const getExams = async () => {
    try {
      const baseURL = '/private/getExamsWithoutResult.php';
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

  const addExamsResult = async (data, e) => {
    try {
      const baseURL = '/private/addExamsResult.php';
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
        setExams((state) =>
          state.filter(
            ({ IDPeopleExams }) => IDPeopleExams !== data.IDPeopleExams
          )
        );

        alert(message);

        e.target.reset();
      }
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div
      className="bg-gray-100 flex justify-center items-center"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <form
        className="bg-white w-full p-5 rounded shadow-sm md:w-96"
        onSubmit={handleSubmit(addExamsResult)}
      >
        <h2 className="text-gray-900 text-2xl text-center">
          Agregar resultado de exámen
        </h2>

        <div className="bg-white pl-3 my-5 rounded transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
          <i className="fas fa-list-alt text-sm text-gray-500"></i>

          <select
            style={{ width: 'calc(100% - 26px)' }}
            className="bg-transparent w-80 h-10 pl-1 outline-none text-sm text-gray-500"
            {...register('IDPeopleExams')}
          >
            <option className="text-black">Examenes sin resultados...</option>

            {exams?.map((exams) => (
              <option key={exams.IDPeopleExams} value={exams.IDPeopleExams}>
                Code: {exams.IDPeopleExams} {exams.peopleExamsName} -{' '}
                {exams.peopleFullname}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="bg-white w-full h-60 pl-3 my-5 rounded transition-all shadow-md outline-none focus-within:ring-2 focus-within:ring-blue-400 text-sm p-2"
          placeholder="Resultado de exámen..."
          {...register('peopleExamsResult')}
        ></textarea>

        <button
          className="bg-blue-500 w-full h-10 outline-none border-none rounded text-white text-sm"
          type="submit"
        >
          Agregar resultado
        </button>

        <button
          className="bg-indigo-500 w-full h-10 mt-4 outline-none border-none rounded text-white text-sm"
          type="reset"
        >
          Reiniciar
        </button>
      </form>
    </div>
  );
};

export default ResultsForm;
