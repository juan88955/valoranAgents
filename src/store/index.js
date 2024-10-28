// Importamos configureStore de Redux Toolkit que simplifica la configuración del store
import { configureStore } from '@reduxjs/toolkit'

// Importamos los reducers de nuestros slices
import agentsReducer from './slices/agentsSlice'
import teamReducer from './slices/teamSlice'

// Creamos y exportamos el store
export const store = configureStore({
    // Configuramos los reducers combinados
    reducer: {
        agents: agentsReducer,  // Estado para los agentes
        team: teamReducer       // Estado para el equipo
    }
})