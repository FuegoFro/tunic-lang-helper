import {Letter, newLetter, Primitive} from "./letter";
import React, {FormEventHandler, useState} from "react";
import LetterView from "./LetterView";
import styles from './CreatePrimitiveView.module.css'

interface CreatePrimitiveViewProps {
    onCreatePrimitive: (primitive: Primitive) => void,
    creatingPrimitive: Primitive
    setCreatingPrimitive: (primitive: Primitive) => void
}

export default function CreatePrimitiveView({onCreatePrimitive, creatingPrimitive, setCreatingPrimitive}: CreatePrimitiveViewProps) {
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        onCreatePrimitive(creatingPrimitive)
        setCreatingPrimitive([newLetter(), ""])
    }
    const [letter, value] = creatingPrimitive;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <LetterView sizePx={200} letter={letter} onUpdate={(update => {
                setCreatingPrimitive([{...letter, ...update}, value])
            })}/>
            <label>
                Value:
                <input type="text" value={value} onChange={(e) => {setCreatingPrimitive([letter, e.target.value])}}/>
            </label>
            <input type="submit" value="Add"/>
        </form>
    )
}
