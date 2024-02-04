const UpdateModal = ({
  toUpdate,
  handleUpdateModal,
  register,
  handleSubmit,
  updateFunc,
}) => {
  return (
    <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
      {/* Update exams form */}
      {toUpdate === 'add exams' && (
        <form
          className="bg-gray-50 w-64 md:w-80 lg:w-96 p-6 rounded shadow-lg"
          onSubmit={handleSubmit(updateFunc)}
        >
          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Nombre de examen:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedExamsName')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Categoria:
            </label>
            <select
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm text-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              {...register('updatedExamsCategory')}
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
              {...register('updatedExamsPrice')}
            />
          </div>

          <button
            className="bg-blue-600 w-full h-10 outline-none border-none rounded text-sm text-white"
            type="submit"
          >
            Actualizar
          </button>

          <button
            className="bg-red-600 w-full h-10 mt-5 outline-none border-none rounded text-sm text-white"
            type="button"
            onClick={handleUpdateModal}
          >
            Cerrar
          </button>
        </form>
      )}

      {/* Update admin form */}
      {toUpdate === 'admins' && (
        <form
          className="bg-gray-50 w-64 md:w-80 lg:w-96 p-6 rounded shadow-lg"
          onSubmit={handleSubmit(updateFunc)}
        >
          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Nombre completo:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedAdminFullname')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Cédula:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedAdminDni')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Email:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedAdminEmail')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Contraseña:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="*******"
              {...register('updatedAdminPassword')}
            />
          </div>

          <button
            className="bg-blue-600 w-full h-10 outline-none border-none rounded text-sm text-white"
            type="submit"
          >
            Actualizar
          </button>

          <button
            className="bg-red-600 w-full h-10 mt-5 outline-none border-none rounded text-sm text-white"
            type="button"
            onClick={handleUpdateModal}
          >
            Cerrar
          </button>
        </form>
      )}

      {toUpdate === 'employees' && (
        <form
          className="bg-gray-50 w-64 md:w-80 lg:w-96 p-6 rounded shadow-lg"
          onSubmit={handleSubmit(updateFunc)}
        >
          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Nombre completo:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedEmployeeFullname')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Cédula:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedEmployeeDni')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">Email:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedEmployeeEmail')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Contraseña:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="password"
              placeholder="*******"
              {...register('updatedEmployeePassword')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs sm:text-sm">
              Contraseña:
            </label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedEmployeeAddress')}
            />
          </div>

          <button
            className="bg-blue-600 w-full h-10 outline-none border-none rounded text-sm text-white"
            type="submit"
          >
            Actualizar
          </button>

          <button
            className="bg-red-600 w-full h-10 mt-5 outline-none border-none rounded text-sm text-white"
            type="button"
            onClick={handleUpdateModal}
          >
            Cerrar
          </button>
        </form>
      )}

      {toUpdate === 'exams' && (
        <form
          className="bg-gray-50 w-64 md:w-80 lg:w-96 p-6 rounded shadow-lg"
          onSubmit={handleSubmit(updateFunc)}
        >
          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs">Nombre completo:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-xs placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedPeopleFullname')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs">Cédula:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-xs placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedPeopleDni')}
            />
          </div>

          <div className="mb-5 flex flex-col">
            <label className="text-gray-900 text-xs">Email:</label>
            <input
              className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-xs placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
              type="text"
              placeholder="Ingrese..."
              {...register('updatedPeopleEmail')}
            />
          </div>

          <button
            className="bg-blue-600 w-full h-10 outline-none border-none rounded text-xs text-white"
            type="submit"
          >
            Actualizar
          </button>

          <button
            className="bg-red-600 w-full h-10 mt-5 outline-none border-none rounded text-xs text-white"
            type="button"
            onClick={handleUpdateModal}
          >
            Cerrar
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateModal;
