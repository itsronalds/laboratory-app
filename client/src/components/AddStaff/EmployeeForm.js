const EmployeeForm = ({ register, handleSubmit, addEmployee }) => {
  return (
    <form className="mt-5" onSubmit={handleSubmit(addEmployee)}>
      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">
          Nombre completo:
        </label>
        <input
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          type="text"
          placeholder="Ingrese..."
          {...register('employeeFullname')}
        />
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">Cédula:</label>
        <input
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          type="text"
          placeholder="Ingrese..."
          {...register('employeeDni')}
        />
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">Email:</label>
        <input
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          type="email"
          placeholder="Ingrese..."
          {...register('employeeEmail')}
        />
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">Contraseña:</label>
        <input
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          type="password"
          placeholder="Ingrese..."
          {...register('employeePassword')}
        />
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">
          Dirección completa:
        </label>
        <input
          className="w-full h-10 pl-5 mt-2 outline-none border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
          type="text"
          placeholder="Ingrese..."
          {...register('employeeAddress')}
        />
      </div>

      <div className="mb-5 flex flex-col">
        <label className="text-gray-900 text-xs sm:text-sm">
          Foto de perfil:
        </label>

        <div className="relative w-full h-10 mt-2 border border-gray-300 rounded-3xl text-sm placeholder-gray-500 transition-all shadow-sm focus-within:ring-2 focus-within:ring-blue-400 flex items-center">
          <span className="ml-5 text-gray-500">Seleccione una foto...</span>
          <input
            className="bg-red-500 absolute w-full opacity-0"
            type="file"
            {...register('employeeAvatar')}
          />
        </div>
      </div>

      <button
        className="bg-blue-500 w-full h-10 outline-none border-none rounded-3xl text-white text-sm"
        type="submit"
      >
        Registrar
      </button>
    </form>
  );
};

export default EmployeeForm;
