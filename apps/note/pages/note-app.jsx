import { noteService } from "../services/note.service.js"

import { NavBar } from "../cmps/nav-bar.jsx"
import { NoteDetails } from "./note-details.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"


export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: null,
        selectedNote: null
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => this.setState({ notes }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadNotes()
        })
    }

    onAdd = (ev) => {
        ev.preventDefault()
        console.log('ev', ev);
        const info = {
            title: ev.target[0].value,
            txt: ev.target[1].value,
        }
        noteService.addNote(info)
            .then(notes => this.setState({ notes }))
    }

    onDelete = (noteId) => {
        noteService.deleteNote(noteId)
            .then(notes => this.setState({ notes }))
    }

    onChangeColor = (ev) => {
        ev.stopPropagation()
        console.log('hello from color');
    }

    onTogglePin = (noteId) => {
        noteService.togglePin(noteId)
            .then(notes => this.setState({ notes }))
    }

    onDuplicateNote = (noteId)=>{
        noteService.duplicateNote(noteId)
        .then(notes => this.setState({ notes }))
    }


    render() {
        let { notes, selectedNote } = this.state

        return (
            <section className="note-app">
                <NavBar />
                {!selectedNote && <React.Fragment>
                    <NoteAdd onAdd={this.onAdd} />
                    <NoteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                    <NoteList onChangeColor={this.onChangeColor} onDelete={this.onDelete} notes={notes}
                    onDuplicateNote={this.onDuplicateNote} onTogglePin={this.onTogglePin} />
                </React.Fragment>
                }
                {selectedNote && <NoteDetails />}
            </section>
        )
    }
}