import React from 'react';

// funcion para el footer
function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold font-valorant">VALORANT AGENTS</h3>
                        <p className="text-sm mt-2">© 2023 Juan Forero. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="https://github.com/juan88955" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-300">
                            GitHub
                        </a>
                        <a href="https://playvalorant.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-300">
                            Official Valorant
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;