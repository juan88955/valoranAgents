import AgentCard from './AgentCard'

// Función para mostrar una lista de agentes en una grilla
function AgentList({ agents, addToTeam, team }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {agents.map(agent => (
                <AgentCard
                    key={agent.uuid}
                    agent={agent}
                    addToTeam={addToTeam}
                    team={team}
                />
            ))}
        </div>
    )
}

export default AgentList