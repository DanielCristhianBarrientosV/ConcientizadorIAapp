import React from 'react';

interface StartScreenProps {
    onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center h-[80vh] animate-fadeIn p-4">
            <h1 className="text-5xl md:text-7xl text-green-400 mb-6 font-bold" style={{textShadow: '0 0 10px #2f2, 0 0 20px #2f2'}}>Dr. Algoritmo</h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-10 p-4 border-2 border-dashed border-green-700 max-w-3xl bg-black/30">
                <p>La inteligencia artificial es una herramienta poderosa. Un eco de nuestra propia mente.</p>
                <p className="mt-2">Pero su potencial para el bien o el caos depende de una sola variable: <span className="font-bold text-white">TÚ</span>.</p>
                <p className="text-green-300 italic mt-6">"¿Podrás guiarme con sabiduría o tus decisiones desatarán mi corrupción?"</p>
            </div>
            <button
                onClick={onStart}
                className="text-2xl md:text-3xl bg-green-700 text-white px-10 py-4 hover:bg-green-600 active:bg-green-800 transition-colors transform hover:scale-105 pixel-button border-green-900"
            >
                INICIAR PROTOCOLO
            </button>
        </div>
    );
};

export default StartScreen;