import { useRef, useEffect } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
    const position = JSON.parse(note.position);
    const colors = JSON.parse(note.colors);
    const body = JSON.parse(note.body);

    const textAreaRef = useRef(null);

    const autoGrow = (textAreaRef) => {
        const {current} = textAreaRef
        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    }

 
    return (
        <div
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
            ></textarea>
        </div>
        </div>
    );
};

export default NoteCard

//24:13 https://www.youtube.com/watch?v=yBThHM2pBbE&t=1790s