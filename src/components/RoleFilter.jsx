import { useDispatch, useSelector } from 'react-redux'
import { setSelectedRole } from '../store/slices/agentsSlice'

function RoleFilter() {
  const dispatch = useDispatch()
  const { selectedRole, allAgents } = useSelector(state => ({
    selectedRole: state.agents.selectedRole,
    allAgents: state.agents.allAgents
  }))

  // Obtener los roles únicos de los agentes
  const roles = [...new Set(allAgents.map(agent => agent.role?.displayName))].filter(Boolean)

  const handleRoleChange = (e) => {
    dispatch(setSelectedRole(e.target.value))
  }

  return (
    <select
      value={selectedRole}
      onChange={handleRoleChange}
      className="bg-gray-800 text-white border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
    >
      <option value="">All Roles</option>
      {roles.map(role => (
        <option key={role} value={role}>{role}</option>
      ))}
    </select>
  )
}

export default RoleFilter