// Función para mostrar paginación de agentes de sies en una página
function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              currentPage === index + 1
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