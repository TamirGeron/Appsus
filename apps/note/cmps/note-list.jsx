import { NotePreview } from "./note-preview.jsx" 

export function NoteList({notes, onDelete}){
   return <section className="note-list">
        {notes.map(note => <NotePreview onDelete={onDelete} note={note} 
        key={note.id} />)}
    </section>
}
