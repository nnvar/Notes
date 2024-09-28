import { useRef, useEffect, useState } from "react";
import { db } from "../appwrite/databases";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser} from "../utils";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note, }) => {
    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const { setSelectedNote } = useContext(NoteContext);

    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const body = bodyParser(note.body);

    let mouseStartPos = {x:0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);

    useEffect (() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
    }, [])

    
    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        setZIndex(cardRef.current)
        setSelectedNote(note);
        }
    };

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        };

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

        setPosition(newPosition);
    };

    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData('position', newPosition);
    };

    const saveData = async (key, value) => {
        const payload = {[key]:JSON.stringify(value)}

        try {
            await db.notes.update(note.$id, payload)
        } catch (error) {
            console.error(error)
        }
        setSaving(false);
    };

    const handleKeyUp = async () => {
        //1 - Initiate "saving" state
        setSaving(true);
     
        //2 - If we have a timer id, clear it so we can add another two seconds
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }
     
        //3 - Set timer to trigger save in 2 seconds
        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };
 
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
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        >
            <DeleteButton noteId={note.$id}></DeleteButton>

            
    {saving && (
        <div className="card-saving">
            <Spinner color={colors.colorText}/>
            <span style={{ color: colors.colorText }}>Saving...</span>
        </div>
    )}

        </div>
        <div className="card-body">
            <textarea
                onKeyUp={handleKeyUp}
                ref={textAreaRef}
                style={{ color: colors.colorText }}
                defaultValue={body}
                onInput={() => {autoGrow(textAreaRef);}}
                onFocus={() => {
                    setZIndex(cardRef.current)
                    setSelectedNote(note);
                }}
            ></textarea>
        </div>
        </div>
    );
};

export default NoteCard

//45.30 https://www.youtube.com/watch?v=yBThHM2pBbE&t=1790s created the notes in appwrite 