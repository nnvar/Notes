import { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const body = JSON.parse(note.body);

    let mouseStartPos = {x:0, y: 0 };
    const cardRef = UseRef(null);

    const textAreaRef = useRef(null);

    useEffect (() => {
        autoGrow(textAreaRef);
    }, [])

    const autoGrow = (textAreaRef) => {
        const {current} = textAreaRef
        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    };

    const mouseDown =(e) => {
        mouseStartPos.x = e,clientX
        mouseStartPos.y = e.clientY
    }

 
    return (
        <div
        ref = {cardRef}
            className="card"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: colors.colorBody,
            }}
        > 
        <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        >
            <Trash></Trash>
        </div>
        <div className="card-body">
            <textarea
                ref={textAreaRef}
                style={{ color: colors.colorText }}
                defaultValue={body}
                onInput={() => {autoGrow(textAreaRef);}}
            ></textarea>
        </div>
        </div>
    );
};

export default NoteCard

//28:04 https://www.youtube.com/watch?v=yBThHM2pBbE&t=1790s