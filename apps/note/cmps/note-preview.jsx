const { Link } = ReactRouterDOM


import { DynamicCmp } from "./dynamic-cmps/dynamic-cmp.jsx"

export function NotePreview({ note, onDelete, onChangeColor,onTogglePin, onDuplicateNote }) {


    return <article className="note-preview" >
        <button className="pin-btn" onClick={() => onTogglePin(note.id)}><img className="settings-img" src="../../assets/img/tack.svg" alt="" /></button>
        <button className="close-btn" onClick={() => onDelete(note.id)}>x</button>
            <DynamicCmp type={note.type} note={note} />
        <div className="settings">
        <button ><img onClick={() => onDuplicateNote(note.id)} className="settings-img" src="../../assets/img/clone.svg" alt="" /></button>
            <button ><img onClick={() => onChangeColor(event)} className="settings-img" src="../../assets/img/palette-solid.svg" alt="" /></button>
            <button><img className="settings-img" src="../../assets/img/font-solid.svg" alt="" /></button>
        </div>
    </article>
}



