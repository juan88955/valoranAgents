import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../store/slices/agentsSlice'

function Pagination() {
  const dispatch = useDispatch()
  const { currentPage, filteredAgents, agentsPerPage } = useSelector(state => ({
    currentPage: state.agents.currentPage,
    filteredAgents: state.agents.filteredAgents,
    agentsPerPage: state.agents.agentsPerPage
  }))

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage)

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  }

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${currentPage === index + 1
              ? 'bg-red-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination