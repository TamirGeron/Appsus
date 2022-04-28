import { NotePreview } from "./note-preview.jsx"

export function UnPinnedNoteList({ notes, onDelete, onChangeColor, onDuplicateNote, onTogglePin }) {
    notes = notes.filter(note=>!note.isPinned)
    
    console.log(notes);
    return <section className="unpinned-note-list">
        {notes.map(note => <NotePreview onChangeColor={onChangeColor}
            onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} onDelete={onDelete} note={note}
            key={note.id} />
        )}
    </section>
}
