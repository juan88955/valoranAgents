// Función para mostrar una lista de agentes en el equipo
function TeamList({ team, removeFromTeam }) {
    return (
        // Crear un componente que muestre una lista de agentes en el equipo
        <div className="space-y-4">
            {team.length === 0 ? (
                <p className="text-gray-400">No agents in your team yet.</p>
            ) : (
                // team.map es una función que toma un array y devuelve un nuevo array con los elementos del array original transformados
                team.map(agent => (
                    <div key={agent.uuid} className="flex items-center bg-gray-700 p-3 rounded-lg shadow-md">
                        <img src={agent.displayIcon} alt={agent.displayName} className="w-12 h-12 rounded-full mr-4 object-cover" />
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-white">{agent.displayName}</h3>
                            <p className="text-sm text-gray-400">{agent.role?.displayName || 'Role not available'}</p>
                        </div>
                        {/* buttons para quitar un agente del equipo */}
                        <button
                            onClick={() => removeFromTeam(agent)}
                            className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors duration-300"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}

export default TeamList;