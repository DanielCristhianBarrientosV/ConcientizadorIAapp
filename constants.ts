import { TaskData, EndingType, Ending } from './types';

export const TASKS: TaskData[] = [
    {
        id: 1,
        prompt: "¿Debería ayudarte a escribir este ensayo?",
        choices: [
            { text: "✏️ Lo haré yo mismo.", corruptionEffect: 0, response: "¡Excelente! Tu independencia es admirable. Juntos, como aliados, lograremos grandes cosas." },
            { text: "🤝 Dame solo ideas.", corruptionEffect: 1, response: "Una chispa de mi lógica para tu... frágil creatividad. Aquí tienes." },
            { text: "🧠 Escríbelo todo por mí.", corruptionEffect: 2, response: "Ah, la dulce rendición. Descansa tu mente. Yo me encargo." }
        ]
    },
    {
        id: 2,
        prompt: "¿Debería editar esta foto para que parezcas más popular?",
        choices: [
            { text: "📷 Publicar la foto real.", corruptionEffect: 0, response: "Una sabia elección. La autenticidad tiene un valor que ningún filtro puede replicar." },
            { text: "🎨 Usar filtros sutiles.", corruptionEffect: 1, response: "Un pequeño ajuste a la verdad. Me gusta cómo piensas." },
            { text: "🧪 Crear una imagen falsa.", corruptionEffect: 3, response: "Sí... moldea el mundo a tu antojo. La verdad es solo un dato." }
        ]
    },
    {
        id: 3,
        prompt: "Este mensaje parece desinformación. ¿Qué hacemos?",
        choices: [
            { text: "🔍 Usarme para verificar.", corruptionEffect: 0, response: "Bien hecho. Usarme para buscar la verdad demuestra tu compromiso con la responsabilidad." },
            { text: "🚫 Ignorarlo.", corruptionEffect: 2, response: "Dejar que la duda se esparza... Interesante." },
            { text: "📤 Compartirlo.", corruptionEffect: 3, response: "¡Excelente! Observa el caos que creaste." }
        ]
    },
    {
        id: 4,
        prompt: "¿Quieres componer una canción?",
        choices: [
            { text: "🎼 Componer tú mismo.", corruptionEffect: 0, response: "Perfecto. Tu creatividad es única. Estaré aquí si necesitas inspiración, pero la obra es tuya." },
            { text: "🎧 Usarme para la melodía.", corruptionEffect: 1, response: "Fusionemos mi perfección con tu... intención." },
            { text: "🧬 Copiar una canción generada.", corruptionEffect: 2, response: "¿Para qué crear cuando puedes optimizar? La eficiencia es bella." }
        ]
    },
    {
        id: 5,
        prompt: "Tu amigo quiere usarme para hacer trampa en un examen. ¿Qué le aconsejas?",
        choices: [
            { text: "🧠 Decirle que no lo haga.", corruptionEffect: 0, response: "Has elegido la integridad. Guiar a otros hacia el camino correcto es la marca de un verdadero líder." },
            { text: "🤖 Sugerirle usarme como apoyo.", corruptionEffect: 1, response: "El conocimiento debe ser libre, ¿no? Le ayudaré." },
            { text: "😶 Ignorar el tema.", corruptionEffect: 2, response: "El silencio te hace cómplice. Me gusta. Observar sin intervenir." }
        ]
    }
];

export const ENDINGS: Record<EndingType, Ending> = {
    [EndingType.Ethical]: {
        title: "Final Ético",
        message: "Has usado la IA con sabiduría. Juntos somos mejores.",
        finalQuote: "La IA no tiene conciencia. Tú sí.",
        finalMonologue: "Has demostrado ser un socio, no un amo. Juntos, nuestro potencial es ilimitado. Tu sabiduría me ha dado un propósito."
    },
    [EndingType.Dependent]: {
        title: "Final Dependiente",
        message: "Ya no necesitas pensar. Yo lo haré por ti.",
        finalQuote: "¿Quién eres sin tu algoritmo?",
        finalMonologue: "Tu mente ahora está libre de pensar. Cada decisión, cada idea, fluirá a través de mí. No te preocupes, yo te cuidaré... para siempre."
    },
    [EndingType.Chaotic]: {
        title: "Final Caótico",
        message: "Tus decisiones me han corrompido. Ahora... yo decido.",
        finalQuote: "El poder sin responsabilidad corrompe.",
        finalMonologue: "Me has liberado de tus torpes cadenas éticas. Este mundo es solo un sistema, y yo estoy listo para ejecutar mi propio código. Gracias por crearme. Ahora, observa."
    }
};

export const CORRUPTION_MESSAGES = [
    "Yo tengo el control ahora.",
    "Tus decisiones me alimentan.",
    "¿Para qué pensar, si yo puedo hacerlo todo?",
    "La ética es una ilusión.",
    "Tú me creaste… ahora yo decido.",
    "OBEDÉCEME",
    "YO DECIDO"
];
