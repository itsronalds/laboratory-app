const ExamsTable = ({
  peopleExams,
  peopleExamsToUpdateFunc,
  deletePeopleExams,
}) => (
  <div className="adminTable__table mt-5 overflow-auto">
    {/* Header */}
    <div
      className="bg-blue-500 rounded mt-5 text-white flex"
      style={{ width: '120rem' }}
    >
      <span className="w-48 py-3 text-center text-xs inline-block">
        # Código
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Nombre completo
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">Cédula</span>

      <span className="w-48 py-3 text-center text-xs inline-block">Email</span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Tipo de examen
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Precio total
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Estado de examen
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">Pago</span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Resultado
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Acciones
      </span>
    </div>

    {/* Body */}
    <div style={{ width: '120rem' }}>
      {peopleExams?.map((peopleExams) => (
        <div key={peopleExams.IDPeopleExams}>
          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.IDPeopleExams}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleFullname}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleDni}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleEmail}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleExamsName}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleExamsPrice}$
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleExamsResult == null
              ? 'En progreso'
              : 'Finalizado'}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleExamsPaymentStatus === '1'
              ? 'Pagado'
              : 'No pagado'}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            {peopleExams.peopleExamsResult == null
              ? 'Aún no hay resultado'
              : peopleExams.peopleExamsResult}
          </span>

          <span className="w-48 py-3 text-center text-xs inline-block">
            <button
              className="bg-blue-500 p-1 mr-1 outline-none border-none rounded text-white text-xs"
              onClick={() => peopleExamsToUpdateFunc(peopleExams)}
            >
              Actualizar
            </button>
            <button
              className="bg-red-500 p-1 ml-1 outline-none border-none rounded text-white text-xs"
              onClick={() => deletePeopleExams(peopleExams.IDPeopleExams)}
            >
              Eliminar
            </button>
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ExamsTable;
