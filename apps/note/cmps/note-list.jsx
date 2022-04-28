import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes, onDelete, onChangeColor, onDuplicateNote, onTogglePin }) {
    console.log(notes);
    return <section className="note-list">
        {notes.map(note => <NotePreview onChangeColor={onChangeColor}
            onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} onDelete={onDelete} note={note}
            key={note.id} />
        )}
    </section>
}
