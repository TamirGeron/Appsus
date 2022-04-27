export class NoteTxt extends React.Component{




    render(){
        console.log(this.props);
        const {title,txt} = this.props.note.info
    return <section className="note-txt">
        <h1>{title}</h1>
        <p>{txt}</p>
    </section>
    }
}