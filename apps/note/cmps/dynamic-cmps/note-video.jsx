export class NoteVideo extends React.Component {




    render() {
        const { title, url } = this.props.note.info

        return <section className="note-video">
            <h1>{title} </h1>
            <iframe src={url} title={title}></iframe>
        </section>
    }
}