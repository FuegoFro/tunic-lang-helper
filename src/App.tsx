import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import LetterView from "./LetterView";
import {Example, isConsonant, isVowel, Letter, letterCompareFunc, newLetter, Primitive} from "./letter";
import CreatePrimitiveView from "./CreatePrimitiveView";
import PrimitiveView from "./PrimitiveView";

const STORAGE_KEY = "letter-data";

interface StorageData {
    primitives: Primitive[]
    examples: Example[]
}

function loadData(): StorageData {
    const dataRaw = localStorage.getItem(STORAGE_KEY);
    if (dataRaw === null) {
        return {
            primitives: [],
            examples: [],
        }
    } else {
        return JSON.parse(dataRaw)
    }
}

function storeData(data: StorageData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function App() {
    const [data, setData] = useState(loadData);
    useEffect(() => {
        storeData(data)
    }, [data]);

    const [creatingPrimitive, setCreatingPrimitive] = useState<Primitive>([newLetter(), ""]);

    const primitivesWithIndices: [Primitive, number][] = data.primitives.map((p, i) => [p, i]);

    const handlePrimitiveClicked = (idx: number) => {
        setCreatingPrimitive(data.primitives[idx])
        const newPrimitives = [...data.primitives];
        newPrimitives.splice(idx, 1);
        const newData: StorageData = {
            primitives: newPrimitives, examples: data.examples
        }
        setData(newData);
    }

    return (
        <div>
            <header className={styles.appHeader}>
                <CreatePrimitiveView
                    creatingPrimitive={creatingPrimitive}
                    setCreatingPrimitive={setCreatingPrimitive}
                    onCreatePrimitive={(primitive) => {
                    const newData: StorageData = {
                        primitives: [...data.primitives, primitive],
                        examples: data.examples
                    };
                    newData.primitives.sort((a, b) => {
                        const letterSort = letterCompareFunc(a[0], b[0]);
                        if (letterSort !== 0) {
                            return letterSort
                        }
                        return a[1].localeCompare(b[1])
                    })
                    setData(newData);
                }}/>
                <div className={styles.primitivesContainer}>
                    <div>
                        <p>Vowels</p>
                        {primitivesWithIndices.filter(([[l, _1], _2]) => {
                            return isVowel(l)
                        }).map(([primitive, idx]) => {
                            return <PrimitiveView key={idx} primitive={primitive} onClick={() => handlePrimitiveClicked(idx)}/>
                        })}
                    </div>
                    <div>
                        <p>Consonants</p>
                        {primitivesWithIndices.filter(([[l, _1], _2]) => {
                            return isConsonant(l)
                        }).map(([primitive, idx]) => {
                            return <PrimitiveView key={idx} primitive={primitive} onClick={() => handlePrimitiveClicked(idx)}/>
                        })}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
