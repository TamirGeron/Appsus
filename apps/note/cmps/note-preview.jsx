const { Link } = ReactRouterDOM


import { DynamicCmp } from "./dynamic-cmps/dynamic-cmp.jsx"

export function NotePreview({ note, onDelete }) {


    return <Link to={`/note/${note.id}`}>
        <article className="note-preview" >
        <button className="close-btn" onClick={()=>onDelete(note.id)}>x</button>
            <DynamicCmp type={note.type} note={note} /> 
            <div className="settings">
    <button><img className="settings-img" src="../../assets/img/palette-solid.svg" alt="" /></button>
    <button><img className="settings-img" src="../../assets/img/font-solid.svg" alt="" /></button>
    </div>
        </article>
    </Link>
}



