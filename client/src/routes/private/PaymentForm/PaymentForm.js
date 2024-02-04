import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from './../../../utils/axios';
import SendEmail from './SendEmail';

const PaymentForm = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      IDPeopleExams: '',
      peopleFullname: '',
      peopleDni: '',
      peopleEmail: '',
    },
  });
  const [currentSection, setCurrentSection] = useState('payments');
  const [exams, setExams] = useState([]);

  useEffect(() => getExams(), []);

  const getExams = async () => {
    try {
      const baseURL = '/private/getExamsWithoutPayment.php';
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

  const addPayment = async (data) => {
    try {
      const baseURL = '/private/addExamsPayment.php';
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

        reset({
          IDPeopleExams: '',
          peopleFullname: '',
          peopleDni: '',
          peopleEmail: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (peopleExams) => {
    if (peopleExams === '') {
      reset({
        IDPeopleExams: '',
        peopleFullname: '',
        peopleDni: '',
        peopleEmail: '',
      });

      return;
    }

    const element = exams.find(
      ({ IDPeopleExams }) => IDPeopleExams === peopleExams
    );

    reset({
      IDPeopleExams: element.IDPeopleExams,
      peopleFullname: element.peopleFullname,
      peopleDni: element.peopleDni,
      peopleEmail: element.peopleEmail,
    });
  };

  return (
    <div className="p-5">
      <div className="flex flex-col items-center">
        {/* Titles */}
        <div>
          <span
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={() => setCurrentSection('payments')}
          >
            Pagos
          </span>

          <span
            className="ml-5 text-blue-500 font-semibold cursor-pointer"
            onClick={() => setCurrentSection('send emails')}
          >
            Envios de examenes
          </span>
        </div>

        {/* Line */}
        <div className="bg-gray-300 w-full h-0.5 mt-5">
          <div
            className="bg-blue-400 w-1/2 h-0.5 ml-0 transition-all"
            style={{ marginLeft: currentSection !== 'payments' && '50%' }}
          ></div>
        </div>
      </div>

      {currentSection === 'payments' && (
        <form className="mt-5" onSubmit={handleSubmit(addPayment)}>
          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Examenes:
            </label>
            <select
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm text-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              {...register('IDPeopleExams')}
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="">No pagados...</option>
              {exams?.map((exams) => (
                <option key={exams.IDPeopleExams} value={exams.IDPeopleExams}>
                  {exams.peopleExamsName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Nombre completo:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('peopleFullname')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Cédula:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('peopleDni')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Email:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('peopleEmail')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Nombre de banco:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('bankName')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Número de tarjeta:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('accountNumber')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Código de tarjeta:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('accountCode')}
            />
          </div>

          <button
            className="bg-blue-500 w-full h-10 outline-none border-none rounded-3xl text-white text-sm"
            type="submit"
          >
            Pagar
          </button>
        </form>
      )}

      {currentSection === 'send emails' && <SendEmail />}
    </div>
  );
};

export default PaymentForm;
