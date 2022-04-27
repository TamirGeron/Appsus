import { noteService } from "../services/note.service.js"

import { DynamicCmp } from "../cmps/dynamic-cmps/dynamic-cmp.jsx"
export class NoteDetails extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        let { note } = this.state
        this.loadNote()
    }

    loadNote = () => {
        let { noteId } = this.props.match.params

        console.log(noteId);
        noteService.getById(noteId)
            .then(note => {
                if (!note) return this.props.history.push('/')
                return this.setState({ note })
            })
    }

    onGoBack = () => {
        this.props.history.push('/note')
    }




    render() {
        const { note } = this.state
        console.log(note);
        return <section className="note-details">
           {note !== null && <DynamicCmp type={note.type} note={note}/>}
            <button onClick={this.onGoBack}>Go back</button>
        </section>
    }
}