import { NoteTxt } from "/note-txt.jsx"
import { NoteImg } from "/note-img.jsx"
import { NoteVideo } from "/note-video.jsx"
import { NoteTodos } from "/note-todos.jsx"



export function DynamicCmp(props) {
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