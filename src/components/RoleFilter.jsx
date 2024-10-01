// Función para mostrar un filtro de roles
function RoleFilter({ selectedRole, setSelectedRole, roles }) {
    return (
      // Crear un componente que muestre un filtro de roles
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
      >
        {/* Crear un componente que muestre un filtro de roles */}
        <option value="">All Roles</option>
        {roles.map(role => (
            // Crear opciones para cada rol seleccionado
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    )
  }
  
  export default RoleFilter
