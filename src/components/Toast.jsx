import React, { useEffect } from 'react';

// Función para mostrar un mensaje de notificación temporal
function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
            {message}
        </div>
    );
}

export default Toast;