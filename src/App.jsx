import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAgents } from './store/slices/agentsSlice'
import { setModalOpen } from './store/slices/teamSlice'
import AgentList from './components/AgentList'
import SearchBar from './components/SearchBar'
import RoleFilter from './components/RoleFilter'
import TeamList from './components/TeamList'
import Modal from './components/Modal'
import Pagination from './components/Pagination'
import Toast from './components/Toast'
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch()
  const {
    filteredAgents,
    loading,
    error
  } = useSelector(state => state.agents)

  const team = useSelector(state => state.team.members)

  // Cargar agentes cuando se monta el componente
  useEffect(() => {
    dispatch(fetchAgents())
  }, [dispatch])

  if (loading) return <div className="text-center mt-8 text-xl">Cargando...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center my-8 text-red-500 font-valorant">
          VALORANT AGENTS
        </h1>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-grow">
            <SearchBar />
            <RoleFilter />
          </div>

          <button
            onClick={() => dispatch(setModalOpen(true))}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-red-500/50"
          >
            Team ({team.length}/5)
          </button>
        </div>

        <Modal title="Your Team">
          <TeamList />
        </Modal>

        {filteredAgents.length > 0 ? (
          <>
            <AgentList />
            <Pagination />
          </>
        ) : (
          <div className="text-center mt-8 text-xl text-red-400">
            No agents found matching your search
          </div>
        )}

        <Toast />
      </div>
      <Footer />
    </div>
  )
}

export default App