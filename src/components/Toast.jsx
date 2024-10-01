import React, { useEffect } from 'react';

// Función para mostrar un mensaje de notificación temporal
function Toast({ message, onClose }) {
    useEffect(() => {
        // Crear un efecto que limpia el mensaje después de 3 segundos
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        // Llamar al método onClose cuando el componente se desmonte

        return () => clearTimeout(timer);
    }, [onClose]);
        // Llamar al método onClose cuando el componente se desmonte
    return (
        // Crear un componente que muestre un mensaje de notificación temporal
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
            {message}
        </div>
    );
}

export default Toast;