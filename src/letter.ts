import exp from "constants";

export interface Vowel {
    // From the top right counter-clockwise to the bottom right
    v1: boolean,
    v2: boolean,
    v3: boolean,
    v4: boolean,
    v5: boolean,
    v6: boolean,
}

export interface Consonant {
    // First 3 are top, second 3 are bottom. Within that: vertical, left, right
    c0: boolean,
    c1: boolean,
    c2: boolean,
    c3: boolean,
    c4: boolean,
    c5: boolean,
    c6: boolean,
}

export interface Letter extends Vowel, Consonant {
    order_swapped: boolean,
}

export function isConsonant(letter: Letter): boolean {
    const asVowel: Vowel = letter;
    return !asVowel.v1
        && !asVowel.v2
        && !asVowel.v3
        && !asVowel.v4
        && !asVowel.v5
        && !asVowel.v6
}

export function isVowel(letter: Letter): boolean {
    const asConsonant: Consonant = letter;
    return !asConsonant.c0
        && !asConsonant.c1
        && !asConsonant.c2
        && !asConsonant.c3
        && !asConsonant.c4
        && !asConsonant.c5
        && !asConsonant.c6
}

export function newLetter(): Letter {
    return {
        v1: false,
        v2: false,
        v3: false,
        v4: false,
        v5: false,
        v6: false,
        c0: false,
        c1: false,
        c2: false,
        c3: false,
        c4: false,
        c5: false,
        c6: false,
        order_swapped: false,
    }
}

const sortPriorityKeys: (keyof Letter)[] = [
    "v1",
    "v2",
    "v3",
    "v4",
    "v5",
    "v6",
    "c0",
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "order_swapped",
]
export function letterCompareFunc(a: Letter, b: Letter): number {
    for (let key of sortPriorityKeys) {
        if (a[key] !== b[key]) {
            return a[key] ? -1 : 1
        }
    }
    return 0;
}

export type Primitive = [Letter, string];
export type Word = Letter[];
export type Example = [Word[], string];
