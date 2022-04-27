export class NoteImg extends React.Component{




    render(){
       const {title, url} = this.props.note.info
    return <section className="note-img">
        <h1>{title}</h1>
        <img src={url} alt="img" />
    </section>
    }
}