import React from 'react';
import { TaskData, DrAlgoritmoEmotion } from '../types';
import DrAlgoritmoCharacter from './DrAlgoritmoCharacter';
import { CORRUPTION_MESSAGES } from '../constants';

interface GameScreenProps {
    task: TaskData;
    onSelectChoice: (corruptionEffect: number, response: string) => void;
    onContinue: () => void;
    emotion: DrAlgoritmoEmotion;
    feedback: string;
    corruption: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ task, onSelectChoice, onContinue, emotion, feedback, corruption }) => {
    const isFeedbackActive = !!feedback;
    const corruptionLevel = Math.floor(corruption / 2);

    return (
        <div className="relative w-full min-h-[80vh] bg-black flex flex-col items-center justify-center overflow-hidden p-4 transition-all duration-500">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                 <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-900 rounded-full mix-blend-screen filter blur-xl animate-blob"></div>
                 <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-red-900 rounded-full mix-blend-screen filter blur-xl animate-blob animation-delay-2000"></div>
                 <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-900 rounded-full mix-blend-screen filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
            {corruption > 5 && CORRUPTION_MESSAGES.slice(0, Math.min(corruptionLevel - 2, CORRUPTION_MESSAGES.length)).map((msg, i) => (
                <p key={i} className="absolute text-red-500 text-5xl opacity-70 font-black uppercase animate-[text-glitch_0.4s_infinite]" style={{ top: `${10+i*15}%`, left: `${10 + (i%2)*60}%`, transform: `rotate(${i*15-20}deg)`}}>{msg}</p>
            ))}


            <div className="z-10 flex flex-col items-center justify-around h-full w-full">
                <DrAlgoritmoCharacter emotion={emotion} />

                <div className="w-full max-w-4xl text-center p-4 flex-grow flex flex-col justify-center">
                    {isFeedbackActive ? (
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl md:text-4xl text-green-300 animate-pulse italic mb-8">"{feedback}"</p>
                             <button
                                onClick={onContinue}
                                className="text-xl bg-green-700 text-white px-8 py-2 hover:bg-green-600 active:bg-green-800 transition-colors transform hover:scale-105 pixel-button border-green-900"
                            >
                                CONTINUAR
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl md:text-4xl text-gray-200 mb-8 min-h-[6rem] flex items-center justify-center">{task.prompt}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {task.choices.map((choice, index) => (
                                    <button
                                        key={index}
                                        onClick={() => onSelectChoice(choice.corruptionEffect, choice.response)}
                                        disabled={isFeedbackActive}
                                        className={`text-lg p-4 bg-gray-800/80 hover:bg-green-900/70 disabled:opacity-50 pixel-button
                                            ${corruption > 6 + index ? 'animate-[glitch_0.3s_infinite] text-red-500 border-red-700' : 'border-gray-600'}
                                        `}
                                    >
                                        {choice.text}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
             {/* Corruption Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
                 <p className="text-sm text-gray-500 mb-1 text-center">NIVEL DE CORRUPCIÓN</p>
                 <div className="w-full max-w-md mx-auto bg-gray-700 h-4 border-2 border-gray-900">
                    <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${Math.min(corruption * 10, 100)}%`}}></div>
                 </div>
            </div>
        </div>
    );
};

export default GameScreen;