// Importamos createSlice de Redux Toolkit para crear el slice
import { createSlice } from '@reduxjs/toolkit'

// Creamos el slice para el equipo
const teamSlice = createSlice({
    name: 'team', // Nombre del slice

    // Estado inicial del slice
    initialState: {
        // Intentamos cargar el equipo desde localStorage, si no existe, array vacío
        members: JSON.parse(localStorage.getItem('valorantTeam')) || [],
        isModalOpen: false,  // Estado del modal (abierto/cerrado)
        toastMessage: ''     // Mensaje para notificaciones
    },

    // Reducers para modificar el estado
    reducers: {
        // Añade o quita un miembro del equipo
        addOrRemoveTeamMember: (state, action) => {
            // Verificamos si el agente ya está en el equipo
            const isAlreadyInTeam = state.members.some(
                member => member.uuid === action.payload.uuid
            )

            if (isAlreadyInTeam) {
                // Si ya está en el equipo, lo quitamos
                state.members = state.members.filter(
                    member => member.uuid !== action.payload.uuid
                )
            } else if (state.members.length < 5) {
                // Si no está en el equipo y hay espacio, lo añadimos
                state.members.push(action.payload)
            } else {
                // Si el equipo está lleno, mostramos un mensaje
                state.toastMessage = 'Your team is full. Remove an agent before adding a new one.'
            }
            // Guardamos el equipo actualizado en localStorage
            localStorage.setItem('valorantTeam', JSON.stringify(state.members))
        },

        // Quita un miembro específico del equipo
        removeTeamMember: (state, action) => {
            // Filtramos el miembro que queremos quitar
            state.members = state.members.filter(
                member => member.uuid !== action.payload.uuid
            )
            // Actualizamos localStorage
            localStorage.setItem('valorantTeam', JSON.stringify(state.members))
        },

        // Controla el estado del modal
        setModalOpen: (state, action) => {
            state.isModalOpen = action.payload
        },

        // Establece el mensaje del toast
        setToastMessage: (state, action) => {
            state.toastMessage = action.payload
        }
    }
})

// Exportamos las acciones
export const {
    addOrRemoveTeamMember,
    removeTeamMember,
    setModalOpen,
    setToastMessage
} = teamSlice.actions

// Exportamos el reducer
export default teamSlice.reducer