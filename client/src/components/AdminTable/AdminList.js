const AdminList = ({ admins, adminToUpdateFunc, deleteAdmin }) => (
  <div className="adminTable__table mt-5 overflow-auto">
    {/* Header */}
    <div
      className="bg-blue-500 rounded mt-5 text-white flex"
      style={{ width: '96rem' }}
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
        Contraseña
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">Avatar</span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Fecha de registro
      </span>

      <span className="w-48 py-3 text-center text-xs inline-block">
        Acciones
      </span>
    </div>

    {/* Body */}
    <div style={{ width: '96rem' }}>
      {admins.map((admin) => (
        <div className="flex" key={admin.IDAdmin} style={{ height: '2.5rem' }}>
          <div className="w-48 text-xs flex justify-center items-center">
            {admin.adminCode}
          </div>

          <div className="w-48 text-center text-xs flex justify-center items-center">
            {admin.adminFullname}
          </div>

          <div className="w-48 text-center text-xs flex justify-center items-center">
            {admin.adminDni}
          </div>

          <div className="w-48 text-center text-xs flex justify-center items-center">
            {admin.adminEmail}
          </div>

          <div className="w-48 text-center text-xs flex justify-center items-center">
            ********
          </div>

          <div className="w-48 flex justify-center items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={admin.adminAvatar}
              alt={admin.adminFullname}
            />
          </div>

          <div className="w-48 text-center text-xs flex justify-center items-center">
            {admin.adminCreatedAt}
          </div>

          <div className="w-48 text-center text-xs flex justify-center items-center">
            <button
              className="bg-blue-500 p-1 mr-1 outline-none border-none rounded text-white text-xs"
              onClick={() => adminToUpdateFunc(admin)}
            >
              Actualizar
            </button>
            <button
              className="bg-red-500 p-1 ml-1 outline-none border-none rounded text-white text-xs"
              onClick={() => deleteAdmin(admin.IDAdmin)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminList;
