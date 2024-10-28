import { useSelector } from 'react-redux'
import AgentCard from './AgentCard'

function AgentList() {
    const { currentAgents } = useSelector(state => ({
        currentAgents: state.agents.filteredAgents.slice(
            (state.agents.currentPage - 1) * state.agents.agentsPerPage,
            state.agents.currentPage * state.agents.agentsPerPage
        )
    }))

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentAgents.map(agent => (
                <AgentCard
                    key={agent.uuid}
                    agent={agent}
                />
            ))}
        </div>
    )
}

export default AgentList