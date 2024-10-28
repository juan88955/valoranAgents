// Importamos las herramientas necesarias de Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Creamos una acción asíncrona para obtener los agentes de la API
export const fetchAgents = createAsyncThunk(
    'agents/fetchAgents', // Nombre único de la acción
    async () => {
        // Hacemos la petición a la API
        const response = await fetch('https://valorant-api.com/v1/agents?isPlayable=true')
        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error en la respuesta de la red')
        }
        const data = await response.json()
        // Filtramos los agentes para obtener solo los únicos y jugables
        return data.data.reduce((acc, current) => {
            if (current.isPlayableCharacter) {
                // Verificamos si el agente ya existe en el acumulador
                const x = acc.find(item => item.displayName === current.displayName);
                if (!x) {
                    // Si no existe, lo añadimos
                    return acc.concat([current]);
                }
            }
            return acc;
        }, [])
    }
)

// Creamos el slice para los agentes
const agentsSlice = createSlice({
    name: 'agents', // Nombre del slice
    // Estado inicial
    initialState: {
        allAgents: [],        // Todos los agentes
        filteredAgents: [],   // Agentes filtrados
        loading: false,       // Estado de carga
        error: null,          // Estado de error
        searchText: '',       // Texto de búsqueda
        selectedRole: '',     // Rol seleccionado
        currentPage: 1,       // Página actual
        agentsPerPage: 6      // Agentes por página
    },
    // Reducers para acciones síncronas
    reducers: {
        // Actualiza el texto de búsqueda y filtra los agentes
        setSearchText: (state, action) => {
            state.searchText = action.payload
            state.currentPage = 1 // Reset a primera página
            // Filtra los agentes según el texto y rol seleccionado
            state.filteredAgents = state.allAgents.filter(agent =>
                agent.displayName.toLowerCase().includes(state.searchText.toLowerCase()) &&
                (state.selectedRole === '' || (agent.role && agent.role.displayName === state.selectedRole))
            )
        },
        // Actualiza el rol seleccionado y filtra los agentes
        setSelectedRole: (state, action) => {
            state.selectedRole = action.payload
            state.currentPage = 1 // Reset a primera página
            // Filtra los agentes según el texto y rol seleccionado
            state.filteredAgents = state.allAgents.filter(agent =>
                agent.displayName.toLowerCase().includes(state.searchText.toLowerCase()) &&
                (state.selectedRole === '' || (agent.role && agent.role.displayName === state.selectedRole))
            )
        },
        // Actualiza la página actual
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    // Reducers para acciones asíncronas
    extraReducers: (builder) => {
        builder
            // Cuando la petición está en proceso
            .addCase(fetchAgents.pending, (state) => {
                state.loading = true
            })
            // Cuando la petición se completa con éxito
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading = false
                state.allAgents = action.payload
                state.filteredAgents = action.payload
            })
            // Cuando la petición falla
            .addCase(fetchAgents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

// Exportamos las acciones
export const { setSearchText, setSelectedRole, setCurrentPage } = agentsSlice.actions
// Exportamos el reducer
export default agentsSlice.reducer