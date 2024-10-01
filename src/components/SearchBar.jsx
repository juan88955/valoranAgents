// Función para mostrar un campo de búsqueda de agentes
function SearchBar({ searchText, setSearchText }) {
    return (
      // Crear un componente que muestre un campo de búsqueda de agentes
      <input
        type="text"
        placeholder="Search agents..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-gray-800 text-white border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
      />
    )
  }
  
  export default SearchBar