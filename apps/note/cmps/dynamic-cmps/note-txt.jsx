import { noteService } from './../../services/note.service.js'


export class NoteTxt extends React.Component{
    state = {
        note: null
      }
  

onSaveEdit= (txt , noteId)=>{
    console.dir(txt);
    noteService.saveEdit(txt, noteId)
    .then(this.setState({note}))
}

    render(){
        let {note} = this.state
        if (!note) note = this.props.note  
        const {id} = note
        const {title,txt} = note.info
    return <section className="note-txt" 
    onInput={e => this.onSaveEdit( e.currentTarget.innerText, id)}>
        <h1 suppressContentEditableWarning="true"
    contentEditable="true" >{title}</h1>
        <pre className="main-txt-note" suppressContentEditableWarning="true"
    contentEditable="true">{txt}</pre>
    </section>
    }
}