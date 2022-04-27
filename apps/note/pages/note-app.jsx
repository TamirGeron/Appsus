import { NavBar } from "../cmps/nav-bar.jsx"
import { NoteDetails } from "./note-details.jsx"
import { NoteAdd } from "../cmps/note-add.jsx"
import { NoteList } from "../cmps/note-list.jsx"
export class NoteApp extends React.Component {

    render() {
        return <section>
            <h1>Hello from note app</h1>
            <NavBar />
            <NoteList/>
            <NoteAdd/>
            <NoteDetails />
        </section>
    }
}