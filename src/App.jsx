// Importar las librerías necesarias
import { useState, useEffect } from 'react'
import AgentList from './components/AgentList'
import SearchBar from './components/SearchBar'
import RoleFilter from './components/RoleFilter'
import TeamList from './components/TeamList'
import Modal from './components/Modal'
import Pagination from './components/Pagination'
import Toast from './components/Toast'
import Footer from './components/Footer'

function App() {
  // Estado para almacenar los agentes cargados desde la API
  const [agents, setAgents] = useState([])

  // Estado para los agentes filtrados por búsqueda o rol
  const [filteredAgents, setFilteredAgents] = useState([])

  // Estado para indicar si la aplicación está cargando datos
  const [loading, setLoading] = useState(true)

  // Estado para manejar errores al cargar datos
  const [error, setError] = useState(null)

  // Estado para manejar el texto de búsqueda
  const [searchText, setSearchText] = useState('')

  // Estado para almacenar el rol seleccionado por el usuario
  const [selectedRole, setSelectedRole] = useState('')

  // Estado para gestionar el equipo del usuario (guardado en localStorage)
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem('valorantTeam')
    return savedTeam ? JSON.parse(savedTeam) : []
  })

  // Estado para mostrar mensajes temporales (toast)
  const [toastMessage, setToastMessage] = useState('')

  // Estado para controlar si el modal del equipo está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Estado para controlar la paginación (página actual)
  const [currentPage, setCurrentPage] = useState(1)

  // Número de agentes que se muestran por página
  const agentsPerPage = 6

  // useEffect para cargar los agentes de la API cuando se monta el componente
  useEffect(() => {
    setLoading(true)
    fetch('https://valorant-api.com/v1/agents?isPlayable=true')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red')
        }
        return response.json()
      })
      .then(data => {
        // Filtrar los agentes únicos y jugables
        const uniqueAgents = data.data.reduce((acc, current) => {
          if (current.isPlayableCharacter) {
            const x = acc.find(item => item.displayName === current.displayName);
            if (!x) {
              return acc.concat([current]);
            }
          }
          return acc;
        }, [])
        setAgents(uniqueAgents) // Guardar los agentes únicos
        setFilteredAgents(uniqueAgents) // Inicialmente todos los agentes son visibles
        setLoading(false) // Termina la carga
      })
      .catch(error => {
        setError('Error al cargar los agentes: ' + error.message)
        setLoading(false)
      })
  }, [])

  // useEffect para filtrar los agentes cuando cambian la búsqueda o el rol seleccionado
  useEffect(() => {
    const filtered = agents.filter(agent =>
      agent.displayName.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedRole === '' || (agent.role && agent.role.displayName === selectedRole))
    )
    setFilteredAgents(filtered)
    setCurrentPage(1) // Reiniciar a la primera página al filtrar
  }, [searchText, selectedRole, agents])

  // useEffect para actualizar el equipo en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('valorantTeam', JSON.stringify(team))
  }, [team])

  // Obtener los roles únicos para mostrarlos en el filtro de roles
  const roles = [...new Set(agents.map(agent => agent.role?.displayName))].filter(Boolean)

  // Función para agregar o quitar un agente del equipo
  const addToTeam = (agent) => {
    setTeam(currentTeam => {
      const isAlreadyInTeam = currentTeam.some(teamAgent => teamAgent.uuid === agent.uuid)

      if (isAlreadyInTeam) {
        // Si el agente ya está en el equipo, lo eliminamos
        return currentTeam.filter(teamAgent => teamAgent.uuid !== agent.uuid)
      } else if (currentTeam.length < 5) {
        // Si el equipo no está lleno, añadimos el agente
        return [...currentTeam, agent]
      } else {
        // Si el equipo está lleno, mostramos un mensaje
        setToastMessage('Your team is full. Remove an agent before adding a new one.')
        return currentTeam
      }
    })
  }

  // Función para eliminar un agente del equipo
  const removeFromTeam = (agentToRemove) => {
    setTeam(team.filter(agent => agent.uuid !== agentToRemove.uuid))
  }

  // Variables para la paginación: agentes mostrados en la página actual
  const indexOfLastAgent = currentPage * agentsPerPage
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage
  const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent)
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage)

  // Función para cambiar de página
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Mostrar un mensaje de carga o error si es necesario
  if (loading) return <div className="text-center mt-8 text-xl">Cargando...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  // Renderizar el componente principal
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center my-8 text-red-500 font-valorant">VALORANT AGENTS</h1>
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-grow">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <RoleFilter selectedRole={selectedRole} setSelectedRole={setSelectedRole} roles={roles} />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-red-500/50"
          >
            Team ({team.length}/5)
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Your Team">
          <TeamList team={team} removeFromTeam={removeFromTeam} />
        </Modal>

        {filteredAgents.length > 0 ? (
          <>
            <AgentList
              agents={currentAgents}
              addToTeam={addToTeam}
              team={team}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        ) : (
          <div className="text-center mt-8 text-xl text-red-400">
            No agents found matching your search
          </div>
        )}

        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
      </div>
      <Footer />
    </div>
  )
}

export default App