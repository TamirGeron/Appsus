import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"
import { utilService } from "../../../services/util.service.js"

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
        selectedNote: null,
        inputValue: {
            title: '',
            body: ''
        }
    }

    componentDidMount() {
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        let inputValue = {}
        for (var value of urlSrcPrm.keys()) {
            inputValue[value] = urlSrcPrm.get(value);
        }
        if (!Object.keys(inputValue)) inputValue = null
        this.setState({ inputValue }, () => this.loadNotes())

        this.removeEvent = eventBusService.on('search', (search) => {
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, search } }), () => this.loadNotes())
        })
    }

    loadNotes() {
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
        const info = {
            title: ev.target[0].value,
            txt: ev.target[1].value,
        }
        noteService.addNote(info, 'note-txt')
            .then(notes => this.setState({ notes }))
    }
    onAddImg = (img) => {
        const info = {
            title: '*Add title*',
            url: img.src,
        }
        noteService.addNote(info, 'note-img')
            .then(notes => this.setState({ notes }))
    }
    onAddVideo = (ev) => {
        ev.preventDefault()
        console.log('ev', ev.path);

        const info = {
            title: ev.target[0].value,
            txt: ev.target[1].value,
        }
        noteService.addNote(info, 'note-video')
            .then(notes => this.setState({ notes }))
    }
    onAddTodos = (ev) => {
        ev.preventDefault()

        let txts = ev.target[1].value.split(',')

        let todos = txts.map(txt => { return { txt, doneAt: new Date() } })
        const info = {
            title: ev.target[0].value,
            todos: todos,
            id: utilService.makeId()
        }

        noteService.addNote(info, 'note-todos')
            .then(notes => this.setState({ notes }))
    }

    renderTodoList =()=>{
        removeTodo()
        .then(notes => this.setState({ notes }))
    }

    onDelete = (noteId) => {
        noteService.deleteNote(noteId)
            .then(notes => this.setState({ notes }))
    }


    onTogglePin = (noteId) => {
        noteService.togglePin(noteId)
            .then(notes => this.setState({ notes }))
    }

    onDuplicateNote = (noteId) => {
        noteService.duplicateNote(noteId)
            .then(notes => this.setState({ notes }))
    }

    setUrl = (inputValue) => {
        console.log(inputValue);
        this.setState({ inputValue })
        const urlSrcPrm = new URLSearchParams(inputValue)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/note?${searchStr}`)
    }

    toMail = (inputValue) => {
        if (!inputValue.txt) return
        const urlObject = {
            isSend: true,
            title: inputValue.title,
            body: inputValue.txt
        }
        const urlSrcPrm = new URLSearchParams(urlObject)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/mail?${searchStr}`)
    }

    render() {
        let { notes, selectedNote, inputValue } = this.state
        return (
            <section className="note-app">
                {!selectedNote && <React.Fragment>
                    <div className="flex">
                        <NoteFilter inputValue={inputValue} filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                        <NoteAdd onAddTodos={this.onAddTodos} onAddImg={this.onAddImg}
                            onAddVideo={this.onAddVideo} onAddTxt={this.onAddTxt} setUrl={this.setUrl} inputValue={this.state.inputValue} />
                    </div>
                    <div className="note-main">
                        <PinnedNoteList onRemoveTodo={this.onRemoveTodo} toMail={this.toMail} onChangeColor={this.onChangeColor} onDelete={this.onDelete} notes={notes}
                            onDuplicateNote={this.onDuplicateNote} onTogglePin={this.onTogglePin} />
                        <UnPinnedNoteList onRemoveTodo={this.onRemoveTodo} toMail={this.toMail} onChangeColor={this.onChangeColor} onDelete={this.onDelete} notes={notes}
                            onDuplicateNote={this.onDuplicateNote} onTogglePin={this.onTogglePin} />
                    </div>
                </React.Fragment>
                }
                {selectedNote && <NoteDetails />}
            </section>
        )
    }
}