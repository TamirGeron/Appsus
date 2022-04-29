import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"

import { NavBar } from "../cmps/nav-bar.jsx"
import { NoteDetails } from "./note-details.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { UnPinnedNoteList } from "../cmps/note-list-unpined.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"
import { PinnedNoteList } from "../cmps/pinned-note-list.jsx"

export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: {
            search: '',
            type: ''
        },
        selectedNote: null
    }

    componentDidMount() {
        this.loadNotes()
        this.removeEvent = eventBusService.on('search', (search) => {
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, search } }), () => this.loadNotes())
        })
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy)
            .then(notes => this.setState({ notes }))
    }

    onSetFilter = (type) => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, type } }), () => {
            this.loadNotes()
        })
    }

    onAddTxt = (ev) => {
        ev.preventDefault()
        console.log('ev', ev.path);

        const info = {
            title: ev.target[0].value,
            txt: ev.target[1].value,
        }
        noteService.addNote(info, 'note-txt')
            .then(notes => this.setState({ notes }))
    }
    onAddImg = (fileName) => {
        console.log('img', fileName);

        const info = {
            title: '*Add title*',
            // url: ev.path[0][1].value,
        }
        noteService.addNote(info, 'note-img' )
            .then(notes => this.setState({ notes }))
    }
    onAddVideo = (ev) => {
        ev.preventDefault()
        console.log('ev', ev.path);

        const info = {
            title: ev.target[0].value,
            txt: ev.target[1].value,
        }
        noteService.addNote(info,'note-video')
            .then(notes => this.setState({ notes }))
    }
    onAddTodos = (ev) => {
        ev.preventDefault()
        console.log('ev', ev.path);

        let txts = ev.target[1].value.split(',')
        console.log(txts);
        
        let todos = txts.map(txt => { return { txt, doneAt: new Date() } })
        const info = {
            title: ev.target[0].value,
            todos: todos
        }

        noteService.addNote(info, 'note-todos')
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

    onDuplicateNote = (noteId) => {
        noteService.duplicateNote(noteId)
            .then(notes => this.setState({ notes }))
    }



    render() {
        let { notes, selectedNote } = this.state
        document.getElementById('root')
        return (
            <section className="note-app">
                <NavBar />
                {!selectedNote && <React.Fragment>
                    <div className="flex">
                    <NoteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                    <NoteAdd onAddTodos={this.onAddTodos} onAddImg={this.onAddImg}
                    onAddVideo={this.onAddVideo} onAddTxt={this.onAddTxt} />
                    </div>
                    <PinnedNoteList onChangeColor={this.onChangeColor} onDelete={this.onDelete} notes={notes}
                        onDuplicateNote={this.onDuplicateNote} onTogglePin={this.onTogglePin} />
                    <UnPinnedNoteList onChangeColor={this.onChangeColor} onDelete={this.onDelete} notes={notes}
                        onDuplicateNote={this.onDuplicateNote} onTogglePin={this.onTogglePin} />
                </React.Fragment>
                }
                {selectedNote && <NoteDetails />}
            </section>
        )
    }
}