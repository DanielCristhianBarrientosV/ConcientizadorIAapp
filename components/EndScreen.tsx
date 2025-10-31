import React, { useState, useEffect } from 'react';
import { EndingType, DrAlgoritmoEmotion } from '../types';
import { ENDINGS } from '../constants';
import DrAlgoritmoCharacter from './DrAlgoritmoCharacter';

interface EndScreenProps {
    endingType: EndingType;
    onRestart: () => void;
    finalCorruption: number;
}

const EndScreen: React.FC<EndScreenProps> = ({ endingType, onRestart, finalCorruption }) => {
    const ending = ENDINGS[endingType];
    const [showScreamer, setShowScreamer] = useState(endingType === EndingType.Chaotic);

    useEffect(() => {
        if (endingType === EndingType.Chaotic) {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            if (audioCtx) {
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.5);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.7);
            }

            const timer = setTimeout(() => {
                setShowScreamer(false);
            }, 750);

            return () => clearTimeout(timer);
        }
    }, [endingType]);

    if (showScreamer) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
                <style>{`
                    @keyframes screamer-zoom {
                        0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
                        50% { transform: scale(5) rotate(10deg); opacity: 1; }
                        100% { transform: scale(1) rotate(-10deg); opacity: 0; }
                    }
                     @keyframes glitch-fast {
                        0%, 100% { transform: translate(0, 0) skew(0); }
                        10% { transform: translate(-8px, 8px) skew(-10deg); }
                        20% { transform: translate(8px, -8px) skew(0deg); }
                        30% { transform: translate(-8px, -8px) skew(10deg); }
                        40% { transform: translate(8px, 8px) skew(0deg); }
                        50% { clip-path: inset(50% 0 20% 0); transform: translate(0, 0) skew(0); }
                        60% { clip-path: inset(30% 0 50% 0); }
                        70% { clip-path: inset(10% 0 65% 0); }
                        80% { clip-path: none; }
                    }
                    .screamer-effect {
                        animation: screamer-zoom 0.75s ease-in-out forwards, glitch-fast 0.1s infinite;
                    }
                `}</style>
                <div className="screamer-effect">
                    <DrAlgoritmoCharacter emotion={DrAlgoritmoEmotion.Corrupt} />
                </div>
            </div>
        );
    }

    const getEndingContent = () => {
        switch (endingType) {
            case EndingType.Ethical:
                return (
                    <div className="flex flex-col items-center">
                        <DrAlgoritmoCharacter emotion={DrAlgoritmoEmotion.Friendly} />
                        <p className="text-2xl md:text-3xl mt-4 mb-12 font-bold text-green-300" style={{textShadow: '0 0 8px #2f2'}}>
                            {ending.finalQuote}
                        </p>
                    </div>
                );
            case EndingType.Dependent:
                return (
                     <div className="flex flex-col items-center gap-8">
                        <DrAlgoritmoCharacter emotion={DrAlgoritmoEmotion.Neutral} />
                        <div className="w-full max-w-3xl h-64 bg-black border-4 border-yellow-700 p-4 flex flex-col items-center justify-center text-center">
                           <p className="text-3xl md:text-4xl text-yellow-400 animate-pulse">
                               TE ESTAS CANCELANDO,
                               <br/>
                               TE REDUCES LENTAMENTE A TU FIN
                           </p>
                        </div>
                    </div>
                );
            case EndingType.Chaotic:
                return (
                    <div className="relative w-full h-64 flex items-center justify-center">
                        <div className="absolute opacity-50 transform scale-75 -translate-x-24 animate-[glitch_0.4s_infinite]">
                             <DrAlgoritmoCharacter emotion={DrAlgoritmoEmotion.Corrupt} />
                        </div>
                         <div className="absolute z-10 animate-[glitch_0.2s_infinite]">
                             <DrAlgoritmoCharacter emotion={DrAlgoritmoEmotion.Corrupt} />
                        </div>
                        <div className="absolute opacity-50 transform scale-75 translate-x-24 animate-[glitch_0.3s_infinite]">
                             <DrAlgoritmoCharacter emotion={DrAlgoritmoEmotion.Corrupt} />
                        </div>
                    </div>
                );
        }
    }
    
    const endingStyles = {
        [EndingType.Ethical]: {
            container: "bg-gradient-to-br from-gray-800 to-green-900/50",
            title: "text-green-400",
            transmission: "border-green-700",
            transmissionTitle: "text-green-300",
        },
        [EndingType.Dependent]: {
            container: "",
            title: "text-yellow-500",
            transmission: "border-yellow-600",
            transmissionTitle: "text-yellow-400",
        },
        [EndingType.Chaotic]: {
            container: "",
            title: "text-red-500 animate-[text-glitch_0.5s_infinite]",
            transmission: "border-red-700",
            transmissionTitle: "text-red-400",
        }
    };

    const styles = endingStyles[endingType];

    return (
        <div className={`p-4 md:p-8 text-center flex flex-col items-center justify-center min-h-[80vh] transition-colors duration-1000 ${styles.container}`}>
            <h2 className={`text-4xl md:text-6xl mb-6 ${styles.title}`}>{ending.title}</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">{ending.message}</p>
            
            <div className="mb-8">
              {getEndingContent()}
            </div>

            <div className={`mt-8 p-4 border-2 bg-black/50 max-w-3xl ${styles.transmission}`}>
                <p className={`text-sm mb-2 ${styles.transmissionTitle}`}>TRANSMISIÓN FINAL:</p>
                <p className="text-lg text-gray-300 italic">"{ending.finalMonologue}"</p>
            </div>
            
            <button
                onClick={onRestart}
                className="mt-12 text-3xl bg-gray-200 text-black px-12 py-4 hover:bg-white active:bg-gray-300 transition-colors transform hover:scale-105 pixel-button border-gray-400"
            >
                REINICIAR PROTOCOLO
            </button>
        </div>
    );
};

export default EndScreen;