// Función para mostrar paginación de agentes de sies en una página
function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      // Crear un componente que muestre paginación de agentes de sies en una página
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          // Crear botones para navegar por las páginas
          <button
            key={index}
            // onClick es una función que se ejecuta cuando se hace clic en el botón
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              // Si la página actual es la misma que la página actual, mostrar un botón de color rojo
              currentPage === index + 1
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {/* Crear botones para navegar por las páginas */}
            {index + 1}
          </button>
        ))}
      </div>
    )
  }
  
  export default Pagination