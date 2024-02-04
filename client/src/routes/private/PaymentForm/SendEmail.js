import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from './../../../utils/axios';

const SendEmail = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      IDPeopleExams: '',
      peopleExamsEmail: '',
      peopleExamsResult: '',
    },
  });
  const [exams, setExams] = useState([]);

  useEffect(() => getExams(), []);

  const getExams = async () => {
    try {
      const baseURL = '/private/getPaidExams.php';
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

  const sendEmail = async (data, e) => {
    try {
      const baseURL = '/private/sendPdf.php';
      const request = await axios({
        method: 'POST',
        data: JSON.stringify(data),
        url: baseURL,
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, message } = request.data;

      if (success === true) {
        alert(message);

        e.target.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnChange = (peopleExams) => {
    if (peopleExams === '') {
      reset({
        IDPeopleExams: '',
        peopleExamsEmail: '',
        peopleExamsResult: '',
      });

      return;
    }

    const element = exams.find(
      ({ IDPeopleExams }) => IDPeopleExams === peopleExams
    );

    reset({
      IDPeopleExams: element.IDPeopleExams,
      peopleExamsEmail: element.peopleEmail,
      peopleExamsResult: element.peopleExamsResult,
    });
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit(sendEmail)}>
      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">Examenes:</label>
        <select
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm text-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          {...register('IDPeopleExams')}
          onChange={(e) => handleOnChange(e.target.value)}
        >
          <option value="">Examenes pagados...</option>
          {exams?.map((exams) => (
            <option
              className="text-black"
              key={exams.IDPeopleExams}
              value={exams.IDPeopleExams}
            >
              Code: {exams.IDPeopleExams} {exams.peopleExamsName} -{' '}
              {exams.peopleFullname} {exams.peopleExamsPrice}$
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">Envio para:</label>
        <input
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          type="text"
          placeholder="Email..."
          {...register('peopleExamsEmail')}
        />
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">Resultado:</label>
        <textarea
          className="w-full h-40 mt-2 outline-none border border-gray-300 rounded p-4 text-sm text-black transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          {...register('peopleExamsResult')}
        ></textarea>
      </div>

      <button
        className="bg-blue-500 w-full h-10 outline-none border-none rounded-3xl text-white text-sm"
        type="submit"
      >
        Enviar email
      </button>
    </form>
  );
};

export default SendEmail;
