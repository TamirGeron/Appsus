export class NoteImg extends React.Component {




    render() {
        const { title, url } = this.props.note.info
        return <section className="note-img">
            <h1 suppressContentEditableWarning="true"
                contentEditable="true">
                {title}
            </h1>
            <div className="img-container">
                <img src={url} alt="img" />
            </div>
        </section>
    }
}