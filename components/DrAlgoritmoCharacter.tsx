import React from 'react';
import { DrAlgoritmoEmotion } from '../types';

interface DrAlgoritmoCharacterProps {
    emotion: DrAlgoritmoEmotion;
}

const DrAlgoritmoCharacter: React.FC<DrAlgoritmoCharacterProps> = ({ emotion }) => {
    const emotionStyles = {
        [DrAlgoritmoEmotion.Friendly]: { // "Bien"
            screenContent: (
                <>
                    {/* Eyes */}
                    <div className="absolute top-[35%] left-[25%] w-6 h-6 bg-green-300 rounded-full" style={{ boxShadow: '0 0 12px #2f2, inset 0 0 4px #fff' }}></div>
                    <div className="absolute top-[35%] right-[25%] w-6 h-6 bg-green-300 rounded-full" style={{ boxShadow: '0 0 12px #2f2, inset 0 0 4px #fff' }}></div>
                    {/* Mouth */}
                    <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-14 h-7 border-b-[6px] border-green-300 rounded-b-full"></div>
                </>
            ),
            antennaColor: 'bg-teal-400',
            antennaGlow: 'shadow-[0_0_15px_5px_#2dd4bf]',
            glitchClass: '',
        },
        [DrAlgoritmoEmotion.Neutral]: { // "Mal"
            screenContent: (
                <>
                    {/* Eyes */}
                    <div className="absolute top-[40%] left-[25%] w-6 h-2 bg-yellow-300 rounded-full"></div>
                    <div className="absolute top-[40%] right-[25%] w-6 h-2 bg-yellow-300 rounded-full"></div>
                    {/* Mouth */}
                    <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-14 h-[6px] bg-yellow-300"></div>
                </>
            ),
            antennaColor: 'bg-yellow-400',
            antennaGlow: 'shadow-[0_0_15px_5px_#facc15]',
            glitchClass: '',
        },
        [DrAlgoritmoEmotion.Annoyed]: { // "Mal" variation
             screenContent: (
                <>
                    {/* Eyes */}
                    <div className="absolute top-[40%] left-[22%] w-7 h-2 bg-orange-400 -rotate-15 rounded-full"></div>
                    <div className="absolute top-[40%] right-[22%] w-7 h-2 bg-orange-400 rotate-15 rounded-full"></div>
                    {/* Mouth */}
                    <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-14 h-7 border-t-[6px] border-orange-400 rounded-t-full"></div>
                </>
            ),
            antennaColor: 'bg-orange-500',
            antennaGlow: 'shadow-[0_0_15px_5px_#f97316]',
            glitchClass: '',
        },
        [DrAlgoritmoEmotion.Corrupt]: { // "Fatal"
            screenContent: (
                <>
                    {/* Eyes */}
                    <div className="absolute top-[35%] left-[25%] w-6 h-6 bg-red-600 rounded-sm animate-pulse" style={{ boxShadow: '0 0 15px #f00, inset 0 0 5px #000' }}></div>
                    <div className="absolute top-[35%] right-[25%] w-6 h-6 bg-red-600 rounded-sm animate-pulse" style={{ boxShadow: '0 0 15px #f00, inset 0 0 5px #000', animationDelay: '0.2s' }}></div>
                    {/* Jagged Mouth */}
                    <div 
                        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-16 h-8"
                        style={{
                            background: 'radial-gradient(ellipse at bottom, #f00 10%, transparent 70%)',
                            clipPath: 'polygon(0 40%, 15% 80%, 30% 40%, 45% 80%, 60% 40%, 75% 80%, 90% 40%, 100% 100%, 0% 100%)'
                        }}
                    ></div>
                    {/* Glitch lines */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-70 character-glitch-lines"></div>
                </>
            ),
            antennaColor: 'bg-red-500',
            antennaGlow: 'shadow-[0_0_20px_8px_#ef4444]',
            glitchClass: 'character-glitch',
        },
    };

    const styles = emotionStyles[emotion];

    return (
        <>
        <style>{`
            .pixel-shadow { box-shadow: -4px 0 #374151, 4px 0 #374151, 0 -4px #374151, 0 4px #374151; }
            .pixel-shadow-darker { box-shadow: -4px 0 #1f2937, 4px 0 #1f2937, 0 -4px #1f2937, 0 4px #1f2937; }
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0px); }
            }
            @keyframes glitch-fast {
                0%, 100% { transform: translate(0, 0) skew(0); }
                10% { transform: translate(-4px, 4px) skew(-5deg); }
                20% { transform: translate(4px, -4px) skew(0deg); }
                30% { transform: translate(-4px, -4px) skew(5deg); }
                40% { transform: translate(4px, 4px) skew(0deg); }
                50% { clip-path: inset(50% 0 20% 0); transform: translate(0, 0) skew(0); }
                60% { clip-path: inset(30% 0 50% 0); }
                70% { clip-path: inset(10% 0 65% 0); }
                80% { clip-path: none; }
            }
            @keyframes glitch-lines {
                0% { background: repeating-linear-gradient(0deg, #f003, #f003 1px, transparent 1px, transparent 10px); }
                25% { background: repeating-linear-gradient(45deg, #f003, #f003 1px, transparent 1px, transparent 10px); }
                50% { background: repeating-linear-gradient(90deg, #0005, #0005 2px, transparent 2px, transparent 12px); }
                75% { background: repeating-linear-gradient(135deg, #f003, #f003 1px, transparent 1px, transparent 10px); }
                100% { background: repeating-linear-gradient(0deg, #0005, #0005 2px, transparent 2px, transparent 12px); }
            }
            .character-glitch { animation: glitch-fast 0.3s infinite steps(1, end); }
            .character-glitch-lines { animation: glitch-lines 0.2s infinite steps(1, end); }
        `}</style>
        <div className={`relative w-80 h-80 flex flex-col items-center justify-end animate-[float_4s_ease-in-out_infinite] ${styles.glitchClass}`}>
            
            {/* Main Body Structure */}
            <div className="relative">
                {/* Head */}
                <div className="relative w-48 h-36 bg-gray-800 rounded-md border-4 border-gray-900 pixel-shadow-darker flex items-center justify-center z-10">
                    {/* Screen Bezel */}
                    <div className="w-[90%] h-[85%] bg-gray-900 rounded-md flex items-center justify-center">
                        {/* Screen */}
                        <div className="relative w-[85%] h-[80%] bg-black rounded overflow-hidden">
                           {styles.screenContent}
                        </div>
                    </div>
                    {/* Antenna */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-gray-600">
                         <div className={`absolute -top-4 -left-1 w-4 h-4 rounded-full ${styles.antennaColor} ${styles.antennaGlow} transition-all`}></div>
                    </div>
                </div>

                {/* Neck */}
                <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-12 h-6 bg-gray-600 rounded-b-md z-0"></div>

                {/* Body */}
                <div className="relative w-32 h-16 bg-gray-700 mx-auto rounded-md border-4 border-gray-900 pixel-shadow-darker mt-4">
                     <div className="absolute inset-x-0 top-2 h-4 bg-gray-800"></div>
                </div>
            </div>

            {/* Arms & Hands */}
            {/* Left Hand */}
            <div className="absolute top-[55%] -left-8 w-16 h-16">
                <div className="absolute top-0 right-0 w-8 h-4 bg-gray-800 rotate-45"></div>
                <div className="absolute top-4 left-0 w-12 h-12 bg-gray-200 rounded-lg border-4 border-gray-900 pixel-shadow-darker transform -rotate-12">
                     <div className="absolute -top-1 left-2 w-4 h-8 bg-gray-200 border-t-4 border-l-4 border-gray-900 rounded-tl-lg"></div>
                     <div className="absolute -top-1 left-8 w-3 h-6 bg-gray-200 border-t-4 border-gray-900 rounded-t-md"></div>
                </div>
            </div>
             {/* Right Hand */}
             <div className="absolute top-[55%] -right-8 w-16 h-16">
                <div className="absolute top-0 left-0 w-8 h-4 bg-gray-800 -rotate-45"></div>
                <div className="absolute top-4 right-0 w-12 h-12 bg-gray-200 rounded-lg border-4 border-gray-900 pixel-shadow-darker transform rotate-12">
                     <div className="absolute -top-1 right-2 w-4 h-8 bg-gray-200 border-t-4 border-r-4 border-gray-900 rounded-tr-lg"></div>
                     <div className="absolute -top-1 right-8 w-3 h-6 bg-gray-200 border-t-4 border-gray-900 rounded-t-md"></div>
                </div>
            </div>
        </div>
        </>
    );
};

export default DrAlgoritmoCharacter;