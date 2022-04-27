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





    render() {
        let {notes , selectedNote} = this.state

        return(
         <section className="note-app">
            <h1>Hello from note app</h1>
            <NavBar />
            <NoteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter}/>
            <NoteList notes={notes} />
            <NoteAdd/>
            <NoteDetails />
        </section>
        )
    }
}