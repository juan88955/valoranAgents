// Función para mostrar un modal de agentes agregados
function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        // Crear un componente que muestre un modal de agentes agregados
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 border-2 border-red-500 shadow-lg shadow-red-500/50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-red-500">{title}</h2>
                    {/* Crear un componente que muestre el título del modal */}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        {/* Crear un componente que muestre un botón para cerrar el modal */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {/* Crear un componente que muestre el contenido del modal */}
                {children}
            </div>
        </div>
    );
}

export default Modal;