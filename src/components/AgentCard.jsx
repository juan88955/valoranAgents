// funbción para mostrar un agente en una tarjeta
function AgentCard({ agent, addToTeam, team }) {
    const isInTeam = team.some(teamAgent => teamAgent.uuid === agent.uuid);

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/50">
            <div className="relative pt-[100%]">
                <img
                    src={agent.fullPortrait || agent.bustPortrait || agent.displayIcon}
                    alt={agent.displayName}
                    className="absolute top-0 left-0 w-full h-full object-cover object-top"
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold text-red-500">{agent.displayName}</h2>
                <p className="text-sm text-gray-400 mb-2">
                    {agent.role ? agent.role.displayName : 'Role not available'}
                </p>
                <button
                    onClick={() => addToTeam(agent)}
                    className={`mt-2 w-full py-2 rounded-full transition-colors duration-300 ${isInTeam
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                >
                    {isInTeam ? 'Remove from Team' : 'Add to Team'}
                </button>
            </div>
        </div>
    )
}

export default AgentCard