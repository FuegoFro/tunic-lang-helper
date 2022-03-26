import {Letter} from "./letter";
import styles from './LetterView.module.css'
import {MouseEventHandler} from "react";

interface LetterViewProps {
    letter: Letter,
    onUpdate: ((update: Partial<Letter>) => void) | null,
    sizePx: number,
}

export default function LetterView({letter, onUpdate, sizePx}: LetterViewProps) {
    const makeSegment = (className: string, key: keyof Letter) => {
        const clickHandler: MouseEventHandler | undefined = onUpdate === null ? undefined : (event) => {
            let updatedProps: Partial<Letter> = {};
            updatedProps[key] = !letter[key];
            onUpdate(updatedProps);
        };

        return (
            <div className={`${className} ${letter[key] ? styles.active : styles.disabled}`} onClick={clickHandler}/>
        )
    }
    return (
        <div className={styles.letterContainer} style={{height: sizePx * 1.5, width: sizePx}}>
            {makeSegment(styles.v1, "v1")}
            {makeSegment(styles.v2, "v2")}
            {makeSegment(styles.v3, "v3")}
            {makeSegment(styles.v4, "v4")}
            {makeSegment(styles.v5, "v5")}
            {makeSegment(styles.v6, "v6")}
            {makeSegment(styles.c0, "c0")}
            {makeSegment(styles.c1, "c1")}
            {makeSegment(styles.c2, "c2")}
            {makeSegment(styles.c3, "c3")}
            {makeSegment(styles.c4, "c4")}
            {makeSegment(styles.c5, "c5")}
            {makeSegment(styles.c6, "c6")}
            <div className={styles.center}/>
        </div>
    )
}
