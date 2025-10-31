
import React, { useState, useEffect } from 'react';
import { DrAlgoritmoEmotion } from '../types';

interface DrAlgoritmoFaceProps {
    emotion: DrAlgoritmoEmotion;
}

const FACES: Record<DrAlgoritmoEmotion, { face: string; color: string; }> = {
    [DrAlgoritmoEmotion.Friendly]: { face: "(^_^)", color: "text-green-400" },
    [DrAlgoritmoEmotion.Neutral]: { face: "(•_•)", color: "text-yellow-400" },
    [DrAlgoritmoEmotion.Annoyed]: { face: "(ಠ_ಠ)", color: "text-orange-500" },
    [DrAlgoritmoEmotion.Corrupt]: { face: "(̸◉̃益◉̃)̸", color: "text-red-500" },
};

const DrAlgoritmoFace: React.FC<DrAlgoritmoFaceProps> = ({ emotion }) => {
    const [glitchFace, setGlitchFace] = useState(FACES[emotion].face);

    useEffect(() => {
        const { face } = FACES[emotion];
        if (emotion === DrAlgoritmoEmotion.Corrupt) {
            const interval = setInterval(() => {
                const corrupted = face.split('').map(char => {
                    if (Math.random() > 0.5) {
                        return String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 5) - 2);
                    }
                    return char;
                }).join('');
                setGlitchFace(corrupted);
            }, 100);
            return () => clearInterval(interval);
        } else {
            setGlitchFace(face);
        }
    }, [emotion]);

    const { color } = FACES[emotion];
    const animation = emotion === DrAlgoritmoEmotion.Corrupt ? 'animate-pulse' : '';

    return (
        <div className={`text-5xl md:text-7xl mb-6 font-mono ${color} ${animation} transition-colors duration-500`}>
            {glitchFace}
        </div>
    );
};

export default DrAlgoritmoFace;
