import { useContext } from "react";
import NoteCard from "../components/NoteCard.jsx";
import { NoteContext } from "../context/NoteContext.jsx";
import Controls from "../components/Controls.jsx";
import Header from "../components/Header.jsx";
 
const NotesPage = () => {
    const { notes, setNotes } = useContext(NoteContext);
    return (
        <div>
            
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id}  />
            ))}
            <Controls></Controls>
        </div>
    );
};

export default NotesPage
