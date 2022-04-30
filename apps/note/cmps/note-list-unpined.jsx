import { NotePreview } from "./note-preview.jsx"

export function UnPinnedNoteList({ toMail, notes, onDelete, onChangeColor, onDuplicateNote, onTogglePin }) {
    notes = notes.filter(note=>!note.isPinned)
    
    return <section className="unpinned-note-list">
        {notes.map(note => <NotePreview toMail={toMail} onChangeColor={onChangeColor}
            onDuplicateNote={onDuplicateNote} onTogglePin={onTogglePin} onDelete={onDelete} note={note}
            key={note.id} />
        )}
    </section>
}
