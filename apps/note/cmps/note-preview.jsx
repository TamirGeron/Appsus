const { Link } = ReactRouterDOM

import { NoteTxt } from "./dynamic-cmps/note-txt.jsx"
import { NoteImg } from "./dynamic-cmps/note-img.jsx"
import { NoteVideo } from "./dynamic-cmps/note-video.jsx"
import { NoteTodos } from "./dynamic-cmps/note-todos.jsx"
 

export function NotePreview({ note, onDelete }) {


    return <Link to={`/note/${note.id}`}>
        <article className="note-preview" >
        <button onClick={()=>onDelete(note.id)}>x</button>
            <DynamicCmp type={note.type} note={note} /> 
        </article>
    </Link>
}



function DynamicCmp(props) {
    switch (props.type) {
        case 'note-txt':
            return <NoteTxt note={props.note} />
        case 'note-img':
            return <NoteImg note={props.note}/>
        case 'note-video':
            return <NoteVideo note={props.note}/>
        case 'note-todos':
            return <NoteTodos note={props.note}/>
    }
}