import { useDispatch, useSelector } from 'react-redux'
import { setSearchText } from '../store/slices/agentsSlice'

function SearchBar() {
  const dispatch = useDispatch()
  const searchText = useSelector(state => state.agents.searchText)

  const handleSearch = (e) => {
    dispatch(setSearchText(e.target.value))
  }

  return (
    <input
      type="text"
      placeholder="Search agents..."
      value={searchText}
      onChange={handleSearch}
      className="bg-gray-800 text-white border border-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
    />
  )
}

export default SearchBar