import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GamePhase, DrAlgoritmoEmotion, EndingType } from './types';
import { TASKS } from './constants';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const getEmotionFromCorruption = (corruption: number): DrAlgoritmoEmotion => {
    if (corruption < 2) return DrAlgoritmoEmotion.Friendly;
    if (corruption < 5) return DrAlgoritmoEmotion.Neutral;
    if (corruption < 8) return DrAlgoritmoEmotion.Annoyed;
    return DrAlgoritmoEmotion.Corrupt;
};
////DJHJXDICHX
const determineEnding = (corruption: number): EndingType => {
    if (corruption <= 3) {
        return EndingType.Ethical;
    }
    if (corruption > 3 && corruption < 8) {
        return EndingType.Dependent;
    }
    return EndingType.Chaotic;
};

// Melodies for each choice path
const GOOD_MELODY = [261.63, 329.63, 392.00, 440.00, 523.25]; // Uplifting C Major Pentatonic
const DEPENDENT_MELODY = [392.00, 329.63, 329.63, 293.66, 261.63]; // Neutral, descending
const BAD_MELODY = [207.65, 196.00, 185.00, 174.61, 164.81]; // Dissonant, descending chromatic

const App: React.FC = () => {
    const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.Start);
    const [corruption, setCorruption] = useState(0);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [feedback, setFeedback] = useState<string>("");
    const audioCtxRef = useRef<AudioContext | null>(null);

    const playChoiceSound = useCallback((corruptionEffect: number, taskIndex: number) => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);

        let frequency: number;

        if (corruptionEffect === 0) { // Good choice
            oscillator.type = 'sine';
            frequency = GOOD_MELODY[taskIndex % GOOD_MELODY.length];
            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(frequency * 2, ctx.currentTime + 0.3);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        } else if (corruptionEffect === 1) { // Dependent choice
            oscillator.type = 'square';
            frequency = DEPENDENT_MELODY[taskIndex % DEPENDENT_MELODY.length];
            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        } else { // Bad choice
            oscillator.type = 'sawtooth';
            frequency = BAD_MELODY[taskIndex % BAD_MELODY.length];
            const noise = ctx.createBufferSource();
            const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            noise.buffer = buffer;
            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.05, ctx.currentTime);
            noise.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start();
            noise.stop(ctx.currentTime + 0.5);

            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        }

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.5);

    }, []);

    const emotion = getEmotionFromCorruption(corruption);
    const currentTask = TASKS[currentTaskIndex];

    const handleStartGame = useCallback(() => {
        if (!audioCtxRef.current) {
            try {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                console.error("Web Audio API is not supported in this browser");
            }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
        setGamePhase(GamePhase.Task);
    }, []);

    const handleSelectChoice = useCallback((corruptionEffect: number, response: string) => {
        playChoiceSound(corruptionEffect, currentTaskIndex);
        setFeedback(response);
        setCorruption(prev => prev + corruptionEffect);
    }, [playChoiceSound, currentTaskIndex]);

    const handleContinue = useCallback(() => {
        setFeedback("");
        if (currentTaskIndex < TASKS.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
        } else {
            setGamePhase(GamePhase.End);
        }
    }, [currentTaskIndex]);

    const handleRestart = useCallback(() => {
        setGamePhase(GamePhase.Start);
        setCorruption(0);
        setCurrentTaskIndex(0);
        setFeedback("");
    }, []);

    const renderContent = () => {
        switch (gamePhase) {
            case GamePhase.Start:
                return <StartScreen onStart={handleStartGame} />;
            case GamePhase.Task:
                return (
                    <GameScreen
                        task={currentTask}
                        onSelectChoice={handleSelectChoice}
                        onContinue={handleContinue}
                        emotion={emotion}
                        feedback={feedback}
                        corruption={corruption}
                    />
                );
            case GamePhase.End:
                const endingType = determineEnding(corruption);
                return <EndScreen endingType={endingType} onRestart={handleRestart} finalCorruption={corruption} />;
            default:
                return null;
        }
    };
    
    const backgroundStyle = {
        '--scanline-opacity': `${Math.min(0.2 + corruption * 0.05, 0.6)}`
    } as React.CSSProperties;

    return (
        <>
        <style>{`
            @keyframes scanline {
                0% { background-position: 0 0; }
                100% { background-position: 0 100%; }
            }
            @keyframes glitch {
                0% { transform: translate(0); }
                25% { transform: translate(3px, -3px) skew(-3deg); }
                50% { transform: translate(-3px, 3px) skew(0deg); }
                75% { transform: translate(3px, 3px) skew(3deg); }
                100% { transform: translate(0); }
            }
            @keyframes text-glitch {
                0%, 100% { transform: translate(0, 0); opacity: 0.7; }
                20% { transform: translate(-5px, 5px); }
                40% { transform: translate(5px, -5px); text-shadow: 0 0 8px #f00; }
                60% { transform: translate(-5px, -5px); }
                80% { transform: translate(5px, 5px); opacity: 0.8; }
            }
            .background-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.6) 3px);
                opacity: var(--scanline-opacity);
                animation: scanline 8s linear infinite;
                pointer-events: none;
                z-index: 1;
            }
            .background-container.glitch-active {
                 animation: glitch 0.25s infinite;
            }
        `}</style>
        <main style={backgroundStyle} className={`min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4 transition-all duration-1000 font-mono background-container ${corruption > 7 ? 'glitch-active' : ''}`}>
            <div className="relative w-full max-w-5xl mx-auto border-8 border-gray-800 bg-black/60 p-1 md:p-2 shadow-2xl shadow-red-900/50 backdrop-blur-sm">
                {renderContent()}
            </div>
             <footer className="absolute bottom-2 text-xs text-gray-700">
              Dr. Algoritmo v5.0 - Corruption Protocol Active
            </footer>
        </main>
        </>
    );
};

export default App;