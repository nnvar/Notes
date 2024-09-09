import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
    const position = JSON.parse(note.position);
    const colors = JSON.parse(note.colors);
    const body = JSON.parse(note.body);
 
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
                style={{ color: colors.colorText }}
                defaultValue={body}
            ></textarea>
        </div>
        </div>
    );
};

export default NoteCard