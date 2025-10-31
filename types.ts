export enum GamePhase {
    Start,
    Task,
    End,
}

export interface Choice {
    text: string;
    corruptionEffect: number;
    response: string;
}

export interface TaskData {
    id: number;
    prompt: string;
    choices: Choice[];
}

export enum EndingType {
    Ethical,
    Dependent,
    Chaotic,
}

export interface Ending {
    title: string;
    message: string;
    finalQuote: string;
    finalMonologue: string;
}

export enum DrAlgoritmoEmotion {
    Friendly,
    Neutral,
    Annoyed,
    Corrupt,
}