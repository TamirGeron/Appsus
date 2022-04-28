export class NoteImg extends React.Component {




    render() {
        const { title, url } = this.props.note.info
        return <section className="note-img">
            <div className="img-container">
                <img src={url} alt="img" />
            </div>
            <h1 suppressContentEditableWarning="true"
                contentEditable="true">
                {title}
            </h1>
        </section>
    }
}