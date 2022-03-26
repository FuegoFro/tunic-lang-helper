import {Primitive} from "./letter";
import styles from './PrimitiveView.module.css'
import LetterView from "./LetterView";

interface PrimitiveViewProps {
    primitive: Primitive
    onClick?: () => void | undefined
}

export default function PrimitiveView({primitive: [letter, value], onClick}: PrimitiveViewProps) {
    return (
        <div className={styles.container} onClick={() => {
            if (onClick !== undefined) {
                onClick();
            }
        }}>
            <LetterView letter={letter} onUpdate={null} sizePx={50}/>
            <p>{value}</p>
        </div>
    )
}
